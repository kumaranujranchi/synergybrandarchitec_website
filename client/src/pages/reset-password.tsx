import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const resetSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [, navigate] = useLocation();
  const { resetPasswordMutation, resetPasswordWithOTPMutation } = useAuth();
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);
  const [isOTP, setIsOTP] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOTP] = useState<string | null>(null);
  
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  
  // Extract token or OTP from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");
    if (resetToken) {
      setToken(resetToken);
      return;
    }
    
    const otpValue = params.get("otp");
    const emailValue = params.get("email");
    if (otpValue && emailValue) {
      setOTP(otpValue);
      setEmail(emailValue);
      setIsOTP(true);
    } else {
      // No token or OTP found, redirect to auth page
      toast({
        title: "Invalid Reset Link",
        description: "The password reset link is invalid or has expired. Please try again.",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [navigate, toast]);
  
  const onSubmit = (data: ResetPasswordFormData) => {
    if (isOTP && email && otp) {
      resetPasswordWithOTPMutation.mutate({
        email,
        otp,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }, {
        onSuccess: () => {
          navigate("/auth/login");
        }
      });
    } else if (token) {
      resetPasswordMutation.mutate({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }, {
        onSuccess: () => {
          navigate("/auth/login");
        }
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-32 md:py-40 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#333333]">Reset Your Password</h2>
          <p className="text-gray-600 mb-6 text-center">
            Please enter your new password below.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium rounded-full transition-all hover:shadow-md h-10 mt-4"
                disabled={resetPasswordMutation.isPending || resetPasswordWithOTPMutation.isPending}
              >
                {(resetPasswordMutation.isPending || resetPasswordWithOTPMutation.isPending) ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Reset Password
              </Button>
              
              <div className="text-center mt-4">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate("/auth/login")}
                  className="text-[#0066CC]"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}