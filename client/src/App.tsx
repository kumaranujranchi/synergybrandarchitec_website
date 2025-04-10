import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Popup from "@/components/popup";
// Service Recommendation (AI Assistant) removed as requested
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import PrivacyPolicy from "@/pages/privacy-policy";
import RefundPolicy from "@/pages/refund-policy";
import TermsOfService from "@/pages/terms-of-service";
import Pricing from "@/pages/pricing";
import StartupPlan from "@/pages/startup-plan-new";
import Addons from "@/pages/addons";
import Services from "@/pages/services";
import Account from "@/pages/account";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminSubmissions from "@/pages/admin/submissions-wrapper";
import WishluvBuildconCaseStudy from "@/pages/case-study/wishluv-buildcon";
import BiryaniMahalCaseStudy from "@/pages/case-study/biryani-mahal";
import TheHelpingHandCaseStudy from "@/pages/case-study/the-helping-hand";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import AuthPage from "@/pages/auth-page";
import ResetPasswordPage from "@/pages/reset-password";
import { useEffect, lazy, Suspense } from "react";
import { scrollToTop } from "@/lib/scrollHelper";
import { AuthProvider } from "@/hooks/use-auth";

// Lazy load admin components
const AdminUsers = lazy(() => import('./pages/admin/users'));
const AdminBlogPosts = lazy(() => import('./pages/admin/blog-posts'));
const AdminBlogPostForm = lazy(() => import('./pages/admin/blog-post-form'));
const AdminAddonProducts = lazy(() => import('./pages/admin/addon-products'));
const AdminAddonOrders = lazy(() => import('./pages/admin/addon-orders'));

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/startup-plan" component={StartupPlan} />
      <Route path="/addons" component={Addons} />
      <Route path="/services" component={Services} />
      {/* User routes removed */}
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
      
      {/* Addon Admin Routes */}
      <Route path="/admin/addons">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminAddonProducts />
        </Suspense>
      </Route>
      
      <Route path="/admin/addon-orders">
        <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
          <AdminAddonOrders />
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
  
  // Update canonical URL and scroll to top whenever location changes
  useEffect(() => {
    // Update canonical URL for SEO
    const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLink) {
      // Don't include hash in canonical URL
      const path = location.split('#')[0];
      
      // Don't add canonical for admin routes
      if (!isAdminRoute && path !== '/') {
        canonicalLink.href = `https://synergybrandarchitect.in${path}`;
      } else {
        canonicalLink.href = 'https://synergybrandarchitect.in';
      }
    }
    
    // Only use smooth scroll when not coming from an external site
    scrollToTop(false);
  }, [location, isAdminRoute]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        {!isAdminRoute && <Popup delay={10000} />}
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
