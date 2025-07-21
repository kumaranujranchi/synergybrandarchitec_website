import Header from "@/components/header";
import Hero from "@/components/hero";
import ClientLogoCarousel from "@/components/client-logo-carousel";
import About from "@/components/about";
import DigitalPresence from "@/components/digital-presence"; 
import Stats from "@/components/stats";
import Services from "@/components/services";
import AdAccountAccess from "@/components/ad-account-access"; // Added new section
import CaseStudies from "@/components/case-studies";
import Testimonials from "@/components/testimonials";
import PricingCTA from "@/components/pricing-cta";

import Contact from "@/components/contact";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ClientLogoCarousel />
      <About />
      <DigitalPresence />
      <Stats />
      <Services />
      <AdAccountAccess />
      <CaseStudies />
      <Testimonials />
      <PricingCTA />

      <Contact />
      <Footer />
      <WhatsappButton />
    </div>
  );
}
