import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" }
];

const serviceLinks = [
  { href: "#", label: "Brand Strategy" },
  { href: "#", label: "Logo & Identity Design" },
  { href: "#", label: "SEO Optimization" },
  { href: "#", label: "Social Media Marketing" },
  { href: "#", label: "Paid Advertising" },
  { href: "#", label: "Content Marketing" }
];

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6 flex items-center">
              <span className="text-[#FF6B00] font-poppins font-bold text-2xl">Synergy</span>
              <span className="text-white font-poppins font-medium text-2xl">Brand</span>
            </div>
            <p className="text-gray-400 mb-6 font-inter">
              Your one-stop digital marketing partner in Patna for strategic brand building and growth-focused marketing solutions.
            </p>
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
                href="https://www.linkedin.com/company/synergy-brand-architect"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a> 
                href="#" 
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                href="https://www.facebook.com/synergybrandarchitect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                href="https://www.instagram.com/synergybrandarchitect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                href="https://www.linkedin.com/company/synergy-brand-architect/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3 font-inter">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const targetElement = document.querySelector(link.href);
                      if (targetElement) {
                        window.scrollTo({
                          top: targetElement.offsetTop - 80,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-poppins font-semibold text-xl mb-6">Our Services</h4>
            <ul className="space-y-3 font-inter">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-[#FF6B00] transition-colors">
                    {link.label}
                  </a>
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
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 font-inter">
            &copy; {new Date().getFullYear()} Synergy Brand Architect. All rights reserved.
          </p>
          <div className="flex space-x-6 font-inter">
            <a href="#" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
