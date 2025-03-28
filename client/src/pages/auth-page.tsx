import { useState } from "react";
import { Redirect, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

type AuthTab = "login" | "register" | "forgot-password" | "verify-otp";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, isLoading, loginMutation, registerMutation, sendOTPMutation, verifyOTPMutation, forgotPasswordMutation } = useAuth();
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  
  // Redirect if user is already logged in
  if (user && !isLoading) {
    // Redirect based on user role
    let redirectPath = "/";

    switch (user.role) {
      case "admin":
        redirectPath = "/admin/dashboard";
        break;
      case "manager":
        redirectPath = "/manager/dashboard";
        break;
      case "user":
        redirectPath = "/user/dashboard";
        break;
      case "customer":
        redirectPath = "/customer/dashboard";
        break;
      default:
        redirectPath = "/";
    }

    return <Redirect to={redirectPath} />;
  }
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };
  
  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        setEmail(values.email);
        setAuthTab("verify-otp");
      },
    });
  };
  
  // Forgot password form
  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(z.object({
      email: z.string().email({ message: "Please enter a valid email address" }),
    })),
  });

  const onForgotPasswordSubmit = async (values: { email: string }) => {
    forgotPasswordMutation.mutate(values);
  };
  
  // OTP verification form
  const otpForm = useForm<{ otp: string }>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(z.object({
      otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
    })),
  });

  const onOtpSubmit = async (values: { otp: string }) => {
    if (!email) {
      return;
    }
    
    verifyOTPMutation.mutate({
      email,
      otp: values.otp,
    });
  };
  
  const resendOtp = () => {
    if (!email) {
      return;
    }
    
    sendOTPMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form section */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary">Synergy Brand Architect</h1>
            <p className="text-muted-foreground mt-2">Login or create an account to get started</p>
          </div>
          
          {authTab === "login" || authTab === "register" ? (
            <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as AuthTab)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email and password to access your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    placeholder="you@example.com" 
                                    className="pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="pl-10 pr-10" 
                                    {...field} 
                                  />
                                  <button 
                                    type="button"
                                    className="absolute right-3 top-3 text-muted-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging in...
                            </>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm" 
                      onClick={() => setAuthTab("forgot-password")}
                    >
                      Forgot password?
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Join us by filling out the information below</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+91 12345 67890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="pr-10" 
                                    {...field} 
                                  />
                                  <button 
                                    type="button"
                                    className="absolute right-3 top-3 text-muted-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating account...
                            </>
                          ) : (
                            "Register"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : authTab === "forgot-password" ? (
            <Card>
              <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter your email to reset your password</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...forgotPasswordForm}>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="you@example.com" 
                                className="pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={forgotPasswordMutation.isPending}
                    >
                      {forgotPasswordMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending reset link...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setAuthTab("login")}
                >
                  Back to login
                </Button>
              </CardFooter>
            </Card>
          ) : authTab === "verify-otp" ? (
            <Card>
              <CardHeader>
                <CardTitle>Verify Your Email</CardTitle>
                <CardDescription>
                  We've sent a verification code to {email}. 
                  Please enter it below to verify your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...otpForm}>
                  <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>One-Time Password (OTP)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter OTP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={verifyOTPMutation.isPending}
                    >
                      {verifyOTPMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify Email"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resendOtp}
                  disabled={sendOTPMutation.isPending}
                >
                  {sendOTPMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend OTP"
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setAuthTab("login")}
                >
                  Back to login
                </Button>
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </div>
      
      {/* Hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="p-8 flex flex-col justify-center max-w-lg mx-auto">
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-6 border border-white/20">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Transform Your Brand's Identity
            </h2>
            <p className="text-foreground/80 mb-6">
              Join Synergy Brand Architect and elevate your brand with our expert branding, 
              design, and marketing solutions. Our team of professionals is dedicated to 
              helping businesses like yours achieve remarkable growth.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-foreground">Strategic Branding</h3>
                  <p className="text-foreground/70">Comprehensive brand strategy tailored to your business goals</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-foreground">Creative Design</h3>
                  <p className="text-foreground/70">Eye-catching visuals that communicate your brand's essence</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-foreground">Digital Marketing</h3>
                  <p className="text-foreground/70">Results-driven campaigns that boost visibility and conversions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}