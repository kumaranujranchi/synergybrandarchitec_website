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
    },
    {
      id: 8,
      name: "Patna University",
      image: "https://i.imgur.com/dz5O9aQ.png"
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
    <section id="clients" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
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
        
        <div className="relative overflow-hidden py-8 px-2">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent"></div>
          
          <motion.div
            ref={containerRef}
            className="flex items-center gap-16 py-8"
            initial={{ x: 0 }}
            animate={{ x: isMobile ? "-100%" : "-50%" }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: isMobile ? 25 : 35, 
              ease: "linear"
            }}
          >
            {allLogos.map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="flex-shrink-0 mx-4 relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
                  className="bg-white p-5 rounded-xl shadow-md flex items-center justify-center h-32 w-[240px] transition-all border border-gray-100"
                >
                  <img 
                    src={logo.image} 
                    alt={`${logo.name} Logo`}
                    className="max-h-24 w-auto max-w-full object-contain transition-all duration-300"
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