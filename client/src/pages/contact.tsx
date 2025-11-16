import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import Contact from "@/components/contact";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WhatsappButton />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0066CC] to-[#004999] text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">
              Get in touch with us to discuss how we can help grow your business with our digital marketing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <Contact />

      <Footer />
    </div>
  );
}
