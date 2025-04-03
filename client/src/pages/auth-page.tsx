import { useState, useEffect } from "react";
import { useLocation, useLocation as useWouterLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Import types from our auth hook instead of schema
import type { LoginData, RegisterData } from "@/hooks/use-auth";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { scrollToTop } from "@/lib/scrollHelper";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  website: z.union([
    z.string().url({ message: "Please enter a valid URL" }),
    z.string().length(0)
  ]), // Accept valid URL or empty string
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [, navigate] = useLocation();
  const [location] = useWouterLocation();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { user, loginMutation, registerMutation, forgotPasswordMutation } = useAuth();
  
  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    
    // Set active tab based on URL
    const tabFromUrl = new URL(window.location.href).searchParams.get("tab");
    if (tabFromUrl === "register") {
      setActiveTab("register");
    }
  }, [user, navigate]);
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const forgotPasswordForm = useForm({
    resolver: zodResolver(z.object({
      email: z.string().email({ message: "Please enter a valid email address" }),
    })),
    defaultValues: {
      email: "",
    },
  });
  
  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  
  const onRegisterSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData as RegisterData);
  };
  
  const onForgotPasswordSubmit = (data: { email: string }) => {
    forgotPasswordMutation.mutate(data);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowForgotPassword(false);
    // Update URL without reloading page
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.pushState({}, "", url.toString());
  };
  
  if (showForgotPassword) {
    return (
      <div className="container mx-auto px-4 py-32 md:py-40 min-h-screen">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#333333]">Reset Password</h2>
            <p className="text-gray-600 mb-6 text-center">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <Form {...forgotPasswordForm}>
              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-6">
                <FormField
                  control={forgotPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    type="submit" 
                    className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium rounded-full transition-all hover:shadow-md h-10"
                    disabled={forgotPasswordMutation.isPending}
                  >
                    {forgotPasswordMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Send Reset Link
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowForgotPassword(false)}
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
  
  return (
    <div className="container mx-auto px-4 py-32 md:py-40 min-h-screen">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden">
        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 bg-white">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#333333]">Welcome Back!</h2>
                  <p className="text-gray-600 mt-1">Sign in to access your account</p>
                </div>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} />
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
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto text-[#0066CC] font-normal text-sm"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium rounded-full transition-all hover:shadow-md h-10"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Sign In
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#333333]">Create an Account</h2>
                  <p className="text-gray-600 mt-1">Register to access our services</p>
                </div>
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                            <Input placeholder="name@example.com" {...field} />
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="10-digit phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
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
                            <Input type="password" placeholder="••••••••" {...field} />
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
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium rounded-full transition-all hover:shadow-md h-10"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Create Account
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Column - Hero Content */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0066CC] to-[#004999] p-6 sm:p-8 flex items-center text-white">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Grow Your Business with Synergy Brand Architect</h1>
            <p className="text-white/90">
              Join thousands of businesses who have transformed their digital presence with our expert marketing services. Create an account to get access to exclusive resources, track your orders, and manage your digital campaigns.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Comprehensive digital marketing solutions
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Track your orders and project progress
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Access to exclusive resources and add-on services
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-[#FF6B00]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Dedicated support for your growth journey
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}