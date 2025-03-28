import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PricingCTA() {
  return (
    <section className="py-16 md:py-24 bg-[#333333] text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="font-poppins font-semibold text-3xl md:text-4xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ready to Supercharge Your Brand?
        </motion.h2>
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto mb-12 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Choose from our flexible pricing packages designed to fit businesses of all sizes. Whether you're just starting out or looking to scale, we have the right solution for you.
        </motion.p>
        <motion.div 
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact"
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
            <Button className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 h-auto">
              View Pricing Packages
            </Button>
          </a>
          <a 
            href="#contact"
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
              variant="outline"
              className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full hover:bg-white hover:text-[#333333] transition-colors h-auto"
            >
              Schedule a Demo
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
