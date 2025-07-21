import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const services = [
  { title: "Brand Strategy & Positioning", url: "/services?tab=brand" },
  { title: "Logo & Identity Design", url: "/services?tab=brand" },
  { title: "Brand Guidelines", url: "/services?tab=brand" },
  { title: "Brand Messaging", url: "/services?tab=brand" },
  { title: "SEO Optimization", url: "/services?tab=digital" },
  { title: "Social Media Marketing", url: "/services?tab=digital" },
  { title: "Paid Advertising", url: "/services?tab=digital" },
  { title: "Content Marketing", url: "/services?tab=digital" },
  { title: "Email Marketing", url: "/services?tab=digital" },
  { title: "Lead Generation", url: "/services?tab=digital" },
  { title: "Website Development", url: "/services?tab=tech" },
  { title: "Website Maintenance", url: "/services?tab=tech" },
  { title: "E-commerce Development", url: "/services?tab=tech" },
];

const resources = [
  { title: "Case Study: Wishluv Buildcon", url: "/case-study/wishluv-buildcon" },
  { title: "Case Study: Biryani Mahal", url: "/case-study/biryani-mahal" },
  { title: "Case Study: The Helping Hand", url: "/case-study/the-helping-hand" }
];

const pageCategories = [
  {
    title: "Main Pages",
    pages: [
      { title: "Home", url: "/" },
      { title: "About Us", url: "/about" },
      { title: "Services", url: "/services" },
      { title: "Startup Plan", url: "/startup-plan" },
      { title: "Resources", url: "/resources" },
      { title: "Pricing", url: "/pricing" },
      { title: "Contact", url: "/#contact" },

    ]
  },
  {
    title: "Our Services",
    pages: services
  },
  {
    title: "Resources & Case Studies",
    pages: resources
  },
  {
    title: "Legal Pages",
    pages: [
      { title: "Privacy Policy", url: "/privacy-policy" },
      { title: "Terms of Service", url: "/terms-of-service" },
      { title: "Refund Policy", url: "/refund-policy" },
    ]
  },
];

export default function Sitemap() {
  // Set the document title
  useEffect(() => {
    document.title = "Website Sitemap - Synergy Brand Architect";
    // Add meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Find all pages on Synergy Brand Architect\'s website with this complete sitemap. Navigate to any section of our site with ease.');
    
    // Clean up when component unmounts
    return () => {
      document.title = "Synergy Brand Architect";
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/">
            <a className="inline-flex items-center text-[#0066CC] hover:text-[#FF6B00] transition-colors font-medium">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </a>
          </Link>
        </div>
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-poppins font-bold text-[#333333] mb-4">
            Website Sitemap
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find everything on our website with ease. This comprehensive sitemap lists all our pages organized by category.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pageCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-xl font-poppins font-semibold text-[#FF6B00] mb-4 pb-2 border-b border-gray-200">
                {category.title}
              </h2>
              <ul className="space-y-3">
                {category.pages.map((page, pageIndex) => (
                  <li key={pageIndex} className="hover:bg-gray-50 rounded-md transition-colors">
                    {page.url.startsWith("/#") ? (
                      <a 
                        href={page.url} 
                        className="block py-2 px-3 text-[#333333] hover:text-[#FF6B00] transition-colors"
                        onClick={(e) => {
                          if (page.url.startsWith("/#")) {
                            e.preventDefault();
                            const elementId = page.url.substring(2); // Remove the "/#" to get just the ID
                            const element = document.getElementById(elementId);
                            if (element) {
                              window.scrollTo({
                                top: element.offsetTop - 100,
                                behavior: "smooth"
                              });
                            } else {
                              window.location.href = "/";
                              // Set a flag in session storage to scroll to the element after navigation
                              sessionStorage.setItem('scrollTo', elementId);
                            }
                          }
                        }}
                      >
                        {page.title}
                      </a>
                    ) : (
                      <Link href={page.url}>
                        <a className="block py-2 px-3 text-[#333333] hover:text-[#FF6B00] transition-colors">
                          {page.title}
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            Can't find what you're looking for? <Link href="/#contact"><a className="text-[#0066CC] hover:text-[#FF6B00]">Contact us</a></Link> and we'll be happy to help!
          </p>
        </div>
      </div>
    </div>
  );
}