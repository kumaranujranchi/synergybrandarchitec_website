import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  const features = [
    "Strategic brand positioning & development",
    "Creative design solutions for all touchpoints",
    "Comprehensive digital marketing campaigns",
    "Data-driven growth strategies",
    "Local market expertise in Patna",
    "Personalized client-focused approach"
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-[#0066CC] to-[#4D94FF] rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full opacity-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c" 
                alt="About Synergy Brand Architect" 
                className="w-full h-auto rounded-xl shadow-lg relative z-10"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-6 text-[#333333]">About Synergy Brand Architect</h2>
            <p className="text-gray-600 mb-6 font-inter">
              Founded in Patna with a passion for helping local businesses thrive in the digital landscape, Synergy Brand Architect combines strategic thinking with creative execution to deliver remarkable results for our clients.
            </p>
            <p className="text-gray-600 mb-8 font-inter">
              Our team of experienced marketers, designers, and digital specialists work together to create integrated solutions that build strong brands and drive measurable growth for businesses across industries.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#FF6B00] flex items-center justify-center">
                    <Check className="text-white" size={12} />
                  </div>
                  <p className="text-gray-700 font-inter">{feature}</p>
                </motion.div>
              ))}
            </div>
            
            <p className="text-gray-600 font-inter">
              Our mission is to empower businesses in Patna and beyond with the brand visibility and digital marketing strategies they need to reach their full potential in today's competitive marketplace.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}