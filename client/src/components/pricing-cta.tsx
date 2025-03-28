import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";

export default function PricingCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#004999]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Grow Your Brand?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Take the first step towards transforming your online presence and growing your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="inline-flex items-center justify-center px-6 py-6 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold rounded-full transition-all hover:shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
            }}
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <a href="tel:+919525230232">
            <Button 
              variant="outline"
              className="inline-flex items-center justify-center px-6 py-6 bg-transparent hover:bg-white/10 text-white border border-white font-semibold rounded-full transition-all"
            >
              Call Us Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}