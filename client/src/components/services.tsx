import { motion } from "framer-motion";
import { Lightbulb, PaintBucket, Megaphone, Search, FileBarChart, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const brandBuildingServices = [
  {
    icon: <Lightbulb className="h-6 w-6 text-[#FF6B00]" />,
    title: "Brand Strategy",
    description: "Develop a comprehensive brand positioning and messaging strategy that resonates with your target audience.",
    color: "primary"
  },
  {
    icon: <PaintBucket className="h-6 w-6 text-[#FF6B00]" />,
    title: "Logo & Identity Design",
    description: "Create a distinctive visual identity that captures your brand essence and leaves a lasting impression.",
    color: "primary"
  },
  {
    icon: <Megaphone className="h-6 w-6 text-[#FF6B00]" />,
    title: "Brand Messaging",
    description: "Craft compelling brand stories and messaging frameworks that communicate your unique value proposition.",
    color: "primary"
  }
];

const digitalMarketingServices = [
  {
    icon: <Search className="h-6 w-6 text-[#0066CC]" />,
    title: "SEO Optimization",
    description: "Improve your search engine visibility and drive organic traffic with our tailored SEO strategies.",
    color: "secondary"
  },
  {
    icon: <FileBarChart className="h-6 w-6 text-[#0066CC]" />,
    title: "Paid Advertising",
    description: "Maximize ROI with strategic PPC campaigns across Google, social media, and display networks.",
    color: "secondary"
  },
  {
    icon: <BarChart className="h-6 w-6 text-[#0066CC]" />,
    title: "Social Media Marketing",
    description: "Build brand awareness and engagement through strategic social media content and campaigns.",
    color: "secondary"
  }
];

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Comprehensive digital marketing and brand building solutions tailored to your business needs and goals.
          </p>
        </motion.div>
        
        {/* Brand Building Services */}
        <div className="mb-16">
          <motion.h3 
            className="font-poppins font-semibold text-2xl md:text-3xl mb-8 text-[#FF6B00] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Brand Building
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {brandBuildingServices.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                variants={item}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h4 className="font-poppins font-medium text-xl mb-3 text-[#333333]">{service.title}</h4>
                <p className="text-gray-600 mb-4 font-inter">
                  {service.description}
                </p>
                <a 
                  href="#contact" 
                  className="text-[#FF6B00] font-medium flex items-center"
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
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Digital Marketing Services */}
        <div>
          <motion.h3 
            className="font-poppins font-semibold text-2xl md:text-3xl mb-8 text-[#0066CC] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Digital Marketing
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {digitalMarketingServices.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                variants={item}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#0066CC] bg-opacity-10 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h4 className="font-poppins font-medium text-xl mb-3 text-[#333333]">{service.title}</h4>
                <p className="text-gray-600 mb-4 font-inter">
                  {service.description}
                </p>
                <a 
                  href="#contact" 
                  className="text-[#0066CC] font-medium flex items-center"
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
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
              Get Free Consultation
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
