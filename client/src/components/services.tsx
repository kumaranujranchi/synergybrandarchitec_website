import { motion } from "framer-motion";
import { Lightbulb, PaintBucket, Megaphone, Search, FileBarChart, BarChart, Globe, Mail, Video, Users, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";

const brandBuildingServices = [
  {
    icon: <Lightbulb className="h-6 w-6 text-[#FF6B00]" />,
    title: "Brand Strategy & Positioning",
    description: "Develop a comprehensive brand strategy that defines your unique position in the market and connects with your target audience.",
    color: "primary"
  },
  {
    icon: <PaintBucket className="h-6 w-6 text-[#FF6B00]" />,
    title: "Logo & Identity Design",
    description: "Create a distinctive visual identity including logo, color palette, typography and design system that captures your brand essence.",
    color: "primary"
  },
  {
    icon: <Megaphone className="h-6 w-6 text-[#FF6B00]" />,
    title: "Brand Communication",
    description: "Craft compelling brand messaging, taglines, and communication frameworks that express your unique value proposition.",
    color: "primary"
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-[#FF6B00]" />,
    title: "Rebranding & Brand Refresh",
    description: "Revitalize your existing brand to better align with your current business goals and market position while maintaining brand equity.",
    color: "primary"
  }
];

const digitalMarketingServices = [
  {
    icon: <Globe className="h-6 w-6 text-[#0066CC]" />,
    title: "Website Development",
    description: "Design and develop responsive, SEO-friendly websites optimized for conversions and exceptional user experience.",
    color: "secondary"
  },
  {
    icon: <Search className="h-6 w-6 text-[#0066CC]" />,
    title: "SEO Optimization",
    description: "Improve your search engine visibility and drive organic traffic with our tailored on-page and local SEO strategies for Patna and beyond.",
    color: "secondary"
  },
  {
    icon: <BarChart className="h-6 w-6 text-[#0066CC]" />,
    title: "Social Media Marketing",
    description: "Build brand awareness and engagement through strategic content and campaigns across Facebook, Instagram, LinkedIn, and other platforms.",
    color: "secondary"
  },
  {
    icon: <FileBarChart className="h-6 w-6 text-[#0066CC]" />,
    title: "Performance Marketing",
    description: "Maximize ROI with data-driven PPC campaigns across Google, social media, and display networks with clear reporting on results.",
    color: "secondary"
  },
  {
    icon: <Mail className="h-6 w-6 text-[#0066CC]" />,
    title: "Email Marketing",
    description: "Nurture leads and drive conversions with targeted email campaigns, newsletters, and automated sequences that deliver results.",
    color: "secondary"
  },
  {
    icon: <Video className="h-6 w-6 text-[#0066CC]" />,
    title: "Video Marketing",
    description: "Create engaging video content for YouTube, reels, and other platforms to increase engagement and stand out from competitors.",
    color: "secondary"
  },
  {
    icon: <Users className="h-6 w-6 text-[#0066CC]" />,
    title: "Community & Influencer Marketing",
    description: "Leverage local influencers and community management to build authentic connections with your target audience in Patna.",
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
            Digital Marketing & Branding Solutions in Patna tailored specifically to your business goals and target audience.
          </p>
        </motion.div>
        
        {/* Brand Building Services */}
        <div className="mb-20">
          <motion.h3 
            className="font-poppins font-semibold text-2xl md:text-3xl mb-8 text-[#FF6B00] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Brand Building Services
          </motion.h3>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto mb-12 text-center font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Establish a memorable brand identity that resonates with your audience and stands out in the market. Our brand building solutions create the foundation for your business growth.
          </motion.p>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
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
                    smoothScrollTo('#contact');
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
        <div className="mb-16">
          <motion.h3 
            className="font-poppins font-semibold text-2xl md:text-3xl mb-8 text-[#0066CC] text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Digital Marketing Services
          </motion.h3>
          <motion.p
            className="text-gray-600 max-w-3xl mx-auto mb-12 text-center font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Drive traffic, generate leads, and increase conversions with our comprehensive digital marketing strategies. As one of the best digital marketing services in Patna, we focus on delivering measurable results.
          </motion.p>
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
                    smoothScrollTo('#contact');
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
          className="text-center mt-16 bg-[#F5F7FA] p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="font-poppins font-semibold text-2xl mb-4 text-[#333333]">Ready to Elevate Your Brand?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 font-inter">
            Whether you need a complete brand makeover or targeted digital marketing campaigns, we're here to help your business thrive in today's competitive landscape.
          </p>
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
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