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
import AdminSubmissions from "@/pages/admin/submissions-wrapper";
import WishluvBuildconCaseStudy from "@/pages/case-study/wishluv-buildcon";
import BiryaniMahalCaseStudy from "@/pages/case-study/biryani-mahal";
import TheHelpingHandCaseStudy from "@/pages/case-study/the-helping-hand";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import { useEffect, lazy, Suspense } from "react";
import { scrollToTop } from "@/lib/scrollHelper";

// Lazy load admin components
const AdminUsers = lazy(() => import('./pages/admin/users'));
const AdminBlogPosts = lazy(() => import('./pages/admin/blog-posts'));
const AdminBlogPostForm = lazy(() => import('./pages/admin/blog-post-form-new'));

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
      
      {/* Blog Routes */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/submissions" component={AdminSubmissions} />
      <Route path="/admin/users">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminUsers />
        </Suspense>
      </Route>
      
      {/* Blog Admin Routes */}
      <Route path="/admin/blog-posts">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminBlogPosts />
        </Suspense>
      </Route>
      
      <Route path="/admin/blog-posts/new">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminBlogPostForm />
        </Suspense>
      </Route>
      
      <Route path="/admin/blog-posts/edit/:id">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminBlogPostForm />
        </Suspense>
      </Route>
      
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
