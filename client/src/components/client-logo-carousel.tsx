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
      name: "Wishluv Buildcon",
      image: "/assets/image_1743264139360.png"
    },
    {
      id: 2,
      name: "Biryani Mahal",
      image: "/assets/image_1743264385159.png"
    },
    {
      id: 3,
      name: "The Helping Hand",
      image: "/assets/image_1743264513629.png"
    },
    {
      id: 4,
      name: "Tata Consultancy Services",
      image: "/assets/image_1743265845454.png"
    },
    {
      id: 5,
      name: "Patna University",
      image: "/assets/image_1743265862567.png"
    },
    {
      id: 6,
      name: "Synergy Brand Architect",
      image: "/assets/image_1743228235170.png"
    },
    {
      id: 7,
      name: "State Bank of India",
      image: "/assets/image_1743190046426.png"
    },
    {
      id: 8, 
      name: "Bharti Airtel",
      image: "/assets/image_1743190625911.png"
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
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Our Clients & Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Trusted by leading businesses in Patna and across Bihar. Here are some of the brands and partners that have experienced growth with our strategies.
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
                  className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-40 w-[280px] transition-all border border-gray-100"
                >
                  <img 
                    src={logo.image} 
                    alt={`${logo.name} Logo`}
                    className="max-h-28 w-auto max-w-full object-contain transition-all duration-300 filter grayscale hover:grayscale-0"
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
            Want to join our growing network of successful clients and partners?
          </p>
          <p className="text-gray-600 max-w-xl mx-auto mt-2 font-inter">
            Get in touch to discuss how we can help your business stand out in the digital landscape with our brand architecture expertise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}