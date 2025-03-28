import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import TermsOfService from "@/pages/terms-of-service";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AuthPage from "@/pages/auth-page";
import CustomerDashboard from "@/pages/customer/dashboard";
import UserDashboard from "@/pages/user/dashboard";
import ManagerDashboard from "@/pages/manager/dashboard";

// Create protected components that handle their own auth logic
const ProtectedAdminDashboard = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.role !== "admin") {
    // Redirect based on user role
    let redirectPath = "/";
    switch (user.role) {
      case "manager": redirectPath = "/manager/dashboard"; break;
      case "user": redirectPath = "/user/dashboard"; break; 
      case "customer": redirectPath = "/customer/dashboard"; break;
      default: redirectPath = "/";
    }
    return <Redirect to={redirectPath} />;
  }
  
  return <AdminDashboard />;
};

const ProtectedCustomerDashboard = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.role !== "customer") {
    // Redirect based on user role
    let redirectPath = "/";
    switch (user.role) {
      case "admin": redirectPath = "/admin/dashboard"; break;
      case "manager": redirectPath = "/manager/dashboard"; break;
      case "user": redirectPath = "/user/dashboard"; break;
      default: redirectPath = "/";
    }
    return <Redirect to={redirectPath} />;
  }
  
  return <CustomerDashboard />;
};

const ProtectedUserDashboard = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.role !== "user") {
    // Redirect based on user role
    let redirectPath = "/";
    switch (user.role) {
      case "admin": redirectPath = "/admin/dashboard"; break;
      case "manager": redirectPath = "/manager/dashboard"; break;
      case "customer": redirectPath = "/customer/dashboard"; break;
      default: redirectPath = "/";
    }
    return <Redirect to={redirectPath} />;
  }
  
  return <UserDashboard />;
};

const ProtectedManagerDashboard = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  if (user.role !== "manager") {
    // Redirect based on user role
    let redirectPath = "/";
    switch (user.role) {
      case "admin": redirectPath = "/admin/dashboard"; break;
      case "user": redirectPath = "/user/dashboard"; break;
      case "customer": redirectPath = "/customer/dashboard"; break;
      default: redirectPath = "/";
    }
    return <Redirect to={redirectPath} />;
  }
  
  return <ManagerDashboard />;
};

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/auth" component={AuthPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={ProtectedAdminDashboard} />
      
      {/* User Role Routes */}
      <Route path="/customer/dashboard" component={ProtectedCustomerDashboard} />
      <Route path="/user/dashboard" component={ProtectedUserDashboard} />
      <Route path="/manager/dashboard" component={ProtectedManagerDashboard} />
      
      {/* Fallback Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
