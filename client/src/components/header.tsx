import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { smoothScrollTo, scrollToTop } from "@/lib/scrollHelper";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "#home", label: "Home", isHome: true },
  { href: "#services", label: "Services" },
  { href: "/pricing", label: "Pricing", isPage: true },
  { href: "/startup-plan", label: "StartUp Plan", isPage: true, highlight: true },
  { href: "/addons", label: "Add-ons", isPage: true },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    
    // If we're not on the home page and the link is to a home page section
    if (location !== '/' && !link.isPage) {
      // Navigate to home page first, then scroll
      window.location.href = '/' + link.href;
      return;
    }
    
    // Otherwise use smooth scroll for hash links
    if (!link.isPage) {
      smoothScrollTo(link.href);
    }
    
    // If it's a page link, the Link component will handle it
    closeMenu();
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={cn(
      "fixed w-full bg-white z-50 transition-shadow duration-300",
      isScrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 py-2 sm:py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <img src="//i.imgur.com/8j3VafC.png" alt="Synergy Brand Architect Logo" className="h-12 sm:h-14 md:h-16 w-auto" />
          <div className="flex items-center">
            <span className="text-[#FF6B00] font-poppins font-bold text-lg sm:text-xl md:text-2xl">Synergy</span>
            <span className="text-[#333333] font-poppins font-medium text-lg sm:text-xl md:text-2xl">Brand Architect</span>
          </div>
        </Link>
        
        {/* Desktop Navigation - only show on xl screens */}
        <nav className="hidden xl:flex space-x-2 xl:space-x-6 font-inter text-[#333333]">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link 
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors font-medium text-xs xl:text-sm whitespace-nowrap", 
                  link.highlight 
                    ? "text-[#FF6B00] font-bold relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#FF6B00] after:transform after:scale-x-100" 
                    : "hover:text-[#FF6B00]"
                )}
                onClick={() => scrollToTop(true)}
              >
                {link.label}
              </Link>
            ) : (
              <a 
                key={link.href}
                href={link.href}
                className="hover:text-[#FF6B00] transition-colors font-medium text-xs xl:text-sm whitespace-nowrap"
                onClick={(e) => handleNavigation(e, link)}
              >
                {link.label}
              </a>
            )
          ))}
        </nav>
        
        {/* Mobile/Tablet Menu Button */}
        <button 
          className="xl:hidden text-[#333333] focus:outline-none ml-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Buttons for Desktop */}
        <div className="hidden xl:flex items-center space-x-2 xl:space-x-4">
          {/* CTA Button (Desktop only) */}
          <a 
            href="#contact" 
            onClick={(e) => handleNavigation(e, { href: '#contact' })}
          >
            <Button 
              className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium text-xs xl:text-sm py-1 px-3 xl:py-2 xl:px-5 rounded-full transition-all hover:shadow-md hover:-translate-y-1 h-auto"
            >
              Get Free Consultation
            </Button>
          </a>
        </div>
        
        {/* Tablet-only buttons - show in medium to large screens but hide in extra-large */}
        <div className="hidden md:flex xl:hidden items-center space-x-2">
          <a 
            href="#contact" 
            onClick={(e) => handleNavigation(e, { href: '#contact' })}
          >
            <Button 
              className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium text-xs py-1 px-2 rounded-full transition-all hover:shadow-md h-auto"
              size="sm"
            >
              Consult
            </Button>
          </a>
        </div>
      </div>
      
      {/* Mobile/Tablet Navigation Menu */}
      <div className={cn(
        "xl:hidden bg-white w-full py-4 shadow-md transition-all duration-300",
        isOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-3 font-inter text-[#333333]">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors py-2 border-b border-gray-100", 
                  link.highlight 
                    ? "text-[#FF6B00] font-bold" 
                    : "hover:text-[#FF6B00]"
                )}
                onClick={() => {
                  closeMenu();
                  scrollToTop(true);
                }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#FF6B00] transition-colors py-2 border-b border-gray-100"
                onClick={(e) => {
                  closeMenu();
                  handleNavigation(e, link);
                }}
              >
                {link.label}
              </a>
            )
          ))}
          
          <div className="flex pt-2">
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-2 sm:py-3 px-4 sm:px-5 rounded-full text-center w-full"
              onClick={(e) => {
                closeMenu();
                handleNavigation(e, { href: '#contact' });
              }}
            >
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}