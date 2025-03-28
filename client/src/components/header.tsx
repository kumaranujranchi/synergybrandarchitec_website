import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={cn(
      "fixed w-full bg-white z-50 transition-shadow duration-300",
      isScrolled ? "shadow-md" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/synergy-logo.png" alt="Synergy Brand Architect Logo" className="h-10 w-auto" />
          <div className="flex items-center">
            <span className="text-[#FF6B00] font-poppins font-bold text-2xl">Synergy</span>
            <span className="text-[#333333] font-poppins font-medium text-2xl">Brand Architect</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-inter text-[#333333]">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="hover:text-[#FF6B00] transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                const targetId = link.href;
                const targetElement = document.querySelector(targetId);
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
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#333333] focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* CTA Button (Desktop only) */}
        <a 
          href="#contact" 
          className="hidden md:block"
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.querySelector('#contact');
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          }}
        >
          <Button 
            className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-5 rounded-full transition-all hover:shadow-md hover:-translate-y-1"
          >
            Get Free Consultation
          </Button>
        </a>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={cn(
        "md:hidden bg-white w-full py-4 shadow-md transition-all duration-300",
        isOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4 font-inter text-[#333333]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#FF6B00] transition-colors py-2 border-b border-gray-100"
              onClick={(e) => {
                e.preventDefault();
                closeMenu();
                const targetId = link.href;
                const targetElement = document.querySelector(targetId);
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
          ))}
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-3 px-5 rounded-full text-center"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              const targetElement = document.querySelector('#contact');
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </header>
  );
}
