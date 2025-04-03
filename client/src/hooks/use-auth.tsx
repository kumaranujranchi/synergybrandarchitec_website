import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
  forgotPasswordMutation: UseMutationResult<void, Error, { email: string }>;
  resetPasswordMutation: UseMutationResult<void, Error, { token: string; password: string }>;
  resetPasswordWithOTPMutation: UseMutationResult<void, Error, { email: string; otp: string; password: string }>;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  website?: string | "";
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | undefined, Error>({
    queryKey: ['/api/auth/check'],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      const data = await res.json();
      
      // Store token in localStorage if it exists in response
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      return data.user;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(['/api/auth/check'], user);
      // Also invalidate cart when user logs in
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name || user.email}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/auth/register", credentials);
      const data = await res.json();
      
      // Store token in localStorage if it exists in response
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      return data.user;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(['/api/auth/check'], user);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name || user.email}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      // Remove token from localStorage
      localStorage.removeItem("token");
      
      queryClient.setQueryData(['/api/auth/check'], null);
      // Also invalidate cart when user logs out
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
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

  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      await apiRequest("POST", "/api/auth/forgot-password", { email });
    },
    onSuccess: () => {
      toast({
        title: "Request sent",
        description: "If the email exists in our system, you will receive a password reset link.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ token, password }: { token: string; password: string }) => {
      await apiRequest("POST", "/api/auth/reset-password", { token, password });
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "Your password has been successfully reset. You can now log in with your new password.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetPasswordWithOTPMutation = useMutation({
    mutationFn: async ({ email, otp, password }: { email: string; otp: string; password: string }) => {
      await apiRequest("POST", "/api/auth/reset-password-otp", { email, otp, password });
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "Your password has been successfully reset. You can now log in with your new password.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        forgotPasswordMutation,
        resetPasswordMutation,
        resetPasswordWithOTPMutation,
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