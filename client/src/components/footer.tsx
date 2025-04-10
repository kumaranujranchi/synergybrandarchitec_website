import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { smoothScrollTo } from "@/lib/scrollHelper";

const quickLinks = [
  { href: "/", label: "Home", isPage: true },
  { href: "/services", label: "Services", isPage: true },
  { href: "/pricing", label: "Pricing", isPage: true },
  { href: "/blog", label: "Blog", isPage: true }
];

const serviceLinks = [
  { href: "/services?tab=brand", label: "Brand Strategy", isPage: true },
  { href: "/services?tab=brand", label: "Logo & Identity Design", isPage: true },
  { href: "/services?tab=digital", label: "SEO Optimization", isPage: true },
  { href: "/services?tab=digital", label: "Social Media Marketing", isPage: true },
  { href: "/services?tab=digital", label: "Paid Advertising", isPage: true },
  { href: "/services?tab=digital", label: "Content Marketing", isPage: true }
];

const resourceLinks = [
  { href: "/#case-studies", label: "Case Studies", isPage: false },
  { href: "/case-study/wishluv-buildcon", label: "Wishluv Buildcon", isPage: true },
  { href: "/case-study/biryani-mahal", label: "Biryani Mahal", isPage: true },
  { href: "/case-study/the-helping-hand", label: "The Helping Hand", isPage: true },
  { href: "/blog", label: "Blog", isPage: true }
];

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-12 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-[#FF6B00] font-poppins font-bold text-2xl">Synergy <span className="text-white font-medium">Brand Architect</span></h3>
            </div>
            <p className="text-gray-400 mb-6 font-inter">
              Your one-stop digital marketing partner in Patna for strategic brand building and growth-focused marketing solutions.
            </p>
            <address className="text-gray-400 mb-6 font-inter not-italic">
              East Gola Road, Vivek Vihar Colony<br />
              Danapur Nizamat, Patna 801503<br />
              Phone: +91 9525 230232
            </address>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/synergybrandarchitect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://wa.me/919525230232"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 font-inter">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Our Services</h4>
            <ul className="space-y-3 font-inter">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Resources</h4>
            <ul className="space-y-3 font-inter">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4 font-inter">
              Subscribe to our newsletter to receive the latest marketing insights and tips.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-l-full w-full focus:outline-none text-[#333333]"
                />
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-r-full px-4"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-gray-400 text-sm font-inter">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        {/* Business Partners Section */}
        <div className="pb-8 flex flex-col items-center">
          <h4 className="font-poppins font-semibold text-xl mb-5 text-center">
            Trusted Business Partners
          </h4>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
              <img 
                src="https://imagizer.imageshack.com/img924/9071/tzLDvZ.png" 
                alt="Meta Business Partner" 
                className="h-12" 
                loading="lazy"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
              <img 
                src="https://imagizer.imageshack.com/img922/3699/VXhcrd.png" 
                alt="Google Business Partner" 
                className="h-12" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
          
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 font-inter mr-4">
              &copy; {new Date().getFullYear()} Synergy Brand Architect. All rights reserved.
            </p>
            
            {/* Fiverr Seller Widget */}
            <div className="mb-4 md:mb-0">
              <a 
                href="https://www.fiverr.com/anujkumar402" 
                target="_blank" 
                rel="nofollow noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
              >
                Designed by anujkumar402 on Fiverr
              </a>
            </div>
          </div>
          
          <div className="flex space-x-6 font-inter">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Refund Policy</Link>
            <Link href="/admin/login" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
