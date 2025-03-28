import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ServiceRecommendation from "@/components/service-recommendation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import TermsOfService from "@/pages/terms-of-service";
import Pricing from "@/pages/pricing";
import StartupPlan from "@/pages/startup-plan";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminSubmissions from "@/pages/admin/submissions";
import WishluvBuildconCaseStudy from "@/pages/case-study/wishluv-buildcon";
import BiryaniMahalCaseStudy from "@/pages/case-study/biryani-mahal";
import TheHelpingHandCaseStudy from "@/pages/case-study/the-helping-hand";
import { useEffect } from "react";
import { scrollToTop } from "@/lib/scrollHelper";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/startup-plan" component={StartupPlan} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      
      {/* Case Study Routes */}
      <Route path="/case-study/wishluv-buildcon" component={WishluvBuildconCaseStudy} />
      <Route path="/case-study/biryani-mahal" component={BiryaniMahalCaseStudy} />
      <Route path="/case-study/the-helping-hand" component={TheHelpingHandCaseStudy} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/submissions" component={AdminSubmissions} />
      <Route path="/admin/users" component={() => import('@/pages/admin/users').then(module => {
        const { default: UsersPage } = module;
        return <UsersPage />;
      })} />
      
      {/* Fallback Route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');
  
  // Scroll to top whenever location changes
  useEffect(() => {
    // Only use smooth scroll when not coming from an external site
    scrollToTop(false);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      {!isAdminRoute && <ServiceRecommendation />}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
