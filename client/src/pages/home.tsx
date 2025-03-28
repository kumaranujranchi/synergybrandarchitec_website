import Header from "@/components/header";
import Hero from "@/components/hero";
import ClientLogos from "@/components/client-logos";
import About from "@/components/about";
import Stats from "@/components/stats";
import Services from "@/components/services";
import CaseStudies from "@/components/case-studies";
import Testimonials from "@/components/testimonials";
import PricingCTA from "@/components/pricing-cta";
import Blog from "@/components/blog";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ClientLogos />
      <About />
      <Stats />
      <Services />
      <CaseStudies />
      <Testimonials />
      <PricingCTA />
      <Blog />
      <Contact />
      <Footer />
      <WhatsappButton />
    </div>
  );
}
