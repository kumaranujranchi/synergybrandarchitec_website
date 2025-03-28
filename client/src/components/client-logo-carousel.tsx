import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ClientLogo {
  id: number;
  name: string;
  image: string;
}

export default function ClientLogoCarousel() {
  const clientLogos: ClientLogo[] = [
    {
      id: 1,
      name: "Reliance Digital",
      image: "https://i.imgur.com/xjZD1nD.png"
    },
    {
      id: 2,
      name: "Adani Group",
      image: "https://i.imgur.com/UzNLFP1.png"
    },
    {
      id: 3,
      name: "Tata Consultancy Services",
      image: "https://i.imgur.com/NbSRANL.png"
    },
    {
      id: 4,
      name: "Indian Oil Corporation",
      image: "https://i.imgur.com/URq3bDJ.png"
    },
    {
      id: 5,
      name: "Bharti Airtel",
      image: "https://i.imgur.com/7ehvM3V.png"
    },
    {
      id: 6,
      name: "Wipro Limited",
      image: "https://i.imgur.com/guHEeLX.png"
    },
    {
      id: 7,
      name: "State Bank of India",
      image: "https://i.imgur.com/osIwhrG.png"
    }
  ];

  // Duplicate the logos for infinite scrolling effect
  const allLogos = [...clientLogos, ...clientLogos];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <section id="clients" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Trusted by leading businesses in Patna and across Bihar. Here are some of the brands that have experienced growth with our strategies.
          </p>
        </motion.div>
        
        <div className="relative overflow-hidden py-6">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
          
          <motion.div
            ref={containerRef}
            className="flex items-center gap-12 py-8"
            initial={{ x: 0 }}
            animate={{ x: isMobile ? "-100%" : "-50%" }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: isMobile ? 20 : 30, 
              ease: "linear"
            }}
          >
            {allLogos.map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="flex-shrink-0 mx-4 relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24 w-[180px] transition-all"
                >
                  <img 
                    src={logo.image} 
                    alt={`${logo.name} Logo`}
                    className="max-h-16 w-auto max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FF6B00] font-medium">
            Want to join our growing list of successful clients?
          </p>
          <p className="text-gray-600 max-w-xl mx-auto mt-2 font-inter">
            Get in touch to discuss how we can help your business stand out in the digital landscape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}