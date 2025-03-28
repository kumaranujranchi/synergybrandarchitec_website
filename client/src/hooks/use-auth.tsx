import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User, LoginData, RegisterData } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<{ user: User, token: string }, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<{ user: User }, Error, RegisterData & { confirmPassword: string }>;
  sendOTPMutation: UseMutationResult<void, Error, { email: string }>;
  verifyOTPMutation: UseMutationResult<{ user: User, token: string }, Error, { email: string, otp: string }>;
  resetPasswordMutation: UseMutationResult<void, Error, { token: string, password: string, confirmPassword: string }>;
  forgotPasswordMutation: UseMutationResult<void, Error, { email: string }>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/auth/check"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/auth/check");
        const data = await res.json();
        return data.user || null;
      } catch (error) {
        return null;
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/check"], data.user);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData & { confirmPassword: string }) => {
      const res = await apiRequest("POST", "/api/auth/register", data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: data.message || "Please check your email to verify your account.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/check"], null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const sendOTPMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      await apiRequest("POST", "/api/auth/send-otp", data);
    },
    onSuccess: () => {
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send OTP",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: async (data: { email: string, otp: string }) => {
      const res = await apiRequest("POST", "/api/auth/verify-otp", data);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/auth/check"], data.user);
      toast({
        title: "Verification successful",
        description: "Your email has been verified.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Verification failed",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string, password: string, confirmPassword: string }) => {
      const { token, ...passwordData } = data;
      const res = await apiRequest("POST", `/api/auth/reset-password/${token}`, passwordData);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Password reset failed",
        description: error.message || "Could not reset password",
        variant: "destructive",
      });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await apiRequest("POST", "/api/auth/forgot-password", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Password reset request sent",
        description: "If your email is registered, you'll receive password reset instructions.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Request failed",
        description: error.message || "Could not process password reset request",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        sendOTPMutation,
        verifyOTPMutation,
        resetPasswordMutation,
        forgotPasswordMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}