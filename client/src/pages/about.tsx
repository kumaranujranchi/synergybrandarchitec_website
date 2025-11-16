import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import About from "@/components/about";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              About Synergy Brand Architect
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Transforming businesses through strategic branding and innovative digital marketing solutions
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />
      
      <WhatsappButton />
      <Footer />
    </div>
  );
}
