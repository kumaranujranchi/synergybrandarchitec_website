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
import StartupPlan from "@/pages/startup-plan-revised";
import Addons from "@/pages/addons";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Resources from "@/pages/resources";
import Sitemap from "@/pages/sitemap";
import Account from "@/pages/account";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminSubmissions from "@/pages/admin/submissions-wrapper";
import WishluvBuildconCaseStudy from "@/pages/case-studies/wishluv-buildcon";
import BiryaniMahalCaseStudy from "@/pages/case-studies/biryani-mahal";
import TheHelpingHandCaseStudy from "@/pages/case-studies/the-helping-hand";
import Blog from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import AuthPage from "@/pages/auth-page";
import ResetPasswordPage from "@/pages/reset-password";
import { useEffect, lazy, Suspense } from "react";
import { scrollToTop } from "@/lib/scrollHelper";
import { AuthProvider } from "@/hooks/use-auth";
import { updateSchemaMarkup } from "@/utils/schemaMarkup";

// Lazy load admin components
const AdminUsers = lazy(() => import('./pages/admin/users'));
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
      <Route path="/portfolio" component={Portfolio} />
      {/* User routes removed */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      
      {/* Resources Route */}
      <Route path="/resources" component={Resources} />
      
      {/* Sitemap Route */}
      <Route path="/sitemap" component={Sitemap} />
      
      {/* Case Study Routes */}
      <Route path="/case-studies/wishluv-buildcon" component={WishluvBuildconCaseStudy} />
      <Route path="/case-studies/biryani-mahal" component={BiryaniMahalCaseStudy} />
      <Route path="/case-studies/the-helping-hand" component={TheHelpingHandCaseStudy} />
      
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
  
  // Update canonical URL, schema markup, and scroll to top whenever location changes
  useEffect(() => {
    // Don't include hash in canonical URL
    const path = location.split('#')[0];
    
    // Handle trailing slashes consistently in the UI for canonicalization
    const normalizedPath = path.endsWith('/') && path.length > 1 
      ? path.slice(0, -1)  // Remove trailing slash for canonical URLs
      : path;
    
    // Update canonical URL for SEO
    const canonicalLink = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLink) {
      // Don't add canonical for admin routes
      if (!isAdminRoute && normalizedPath !== '/') {
        canonicalLink.href = `https://synergybrandarchitect.in${normalizedPath}`;
      } else {
        canonicalLink.href = 'https://synergybrandarchitect.in';
      }
    }
    
    // Update schema.org markup for the current page
    if (!isAdminRoute) {
      // Get page-specific data for schema markup if needed
      let pageData;
      
      // For blog posts, we need to extract the slug from the URL
      if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
        const slug = normalizedPath.replace('/blog/', '');
        // We'll pass the slug so the schema markup function can find the correct blog post data
        pageData = { slug };
      }
      
      // For case studies, set appropriate data
      if (normalizedPath.startsWith('/case-studies/')) {
        const caseStudyName = normalizedPath.replace('/case-studies/', '');
        pageData = { caseStudyName };
      }
      
      updateSchemaMarkup(normalizedPath, pageData);
      
      // Also update the page title based on the current route for better SEO
      updatePageTitle(normalizedPath);
    }
    
    // Only use smooth scroll when not coming from an external site
    scrollToTop(false);
  }, [location, isAdminRoute]);
  
  // Function to update page title based on current route
  const updatePageTitle = (path: string) => {
    let title = 'Synergy Brand Architect - Digital Marketing & Brand Building Agency';
    
    // Set specific titles based on routes
    if (path.startsWith('/services')) {
      title = 'Services | Digital Marketing, Web Development, Brand Strategy - Synergy Brand Architect';
    } else if (path === '/portfolio') {
      title = 'Portfolio | Our Work & Case Studies - Synergy Brand Architect';
    } else if (path.startsWith('/startup-plan')) {
      title = 'Startup Website Package - Get Online at ₹15,000 | Synergy Brand Architect';
    } else if (path.startsWith('/blog') && path !== '/blog') {
      // For blog posts, we could get the actual title from blog data
      // For now, use a generic title
      const slug = path.replace('/blog/', '');
      const readableTitle = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      title = `${readableTitle} | Synergy Brand Architect Blog`;
    } else if (path === '/blog') {
      title = 'Digital Marketing Blog | SEO, Social Media & Web Design Tips - Synergy Brand Architect';
    } else if (path.startsWith('/resources')) {
      title = 'Digital Marketing Resources & Tools | Synergy Brand Architect';
    } else if (path.startsWith('/addons')) {
      title = 'Digital Marketing & Web Development Services | Synergy Brand Architect';
    } else if (path.startsWith('/case-studies/')) {
      const caseStudy = path.replace('/case-studies/', '');
      const readableTitle = caseStudy
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      title = `${readableTitle} Case Study | Synergy Brand Architect`;
    }
    
    document.title = title;
  };

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
