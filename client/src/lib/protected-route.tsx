import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route, useLocation, RouteComponentProps } from "wouter";

type ProtectedRouteProps = {
  path: string;
  component: React.ComponentType;
  allowedRoles?: string[];
};

export function ProtectedRoute({
  path,
  component: Component,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  // Create a wrapper component to handle the route props properly
  const ProtectedComponent = (props: RouteComponentProps) => {
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

    // Role-based access control
    if (allowedRoles && !allowedRoles.includes(user.role)) {
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

    // Pass through all props to the component
    return <Component />;
  };

  return <Route path={path} component={ProtectedComponent} />;
}