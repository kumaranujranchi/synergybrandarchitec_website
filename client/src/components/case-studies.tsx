import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    image: "https://images.unsplash.com/photo-1534456517566-8639d26d896c",
    category: "E-commerce",
    title: "200% Revenue Increase",
    description: "How we helped a local retailer expand their online presence and double their sales in 6 months."
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    category: "Restaurant",
    title: "Brand Transformation",
    description: "A complete brand makeover that positioned a local restaurant as a premium dining destination."
  },
  {
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e4",
    category: "Real Estate",
    title: "Lead Generation Success",
    description: "How we generated 150+ qualified leads per month for a Patna-based real estate developer."
  }
];

export default function CaseStudies() {
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
    <section id="case-studies" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            See how we've helped businesses like yours achieve remarkable growth through our strategic approach.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {caseStudies.map((study, index) => (
            <motion.div 
              key={index}
              className="rounded-xl overflow-hidden shadow-lg relative group"
              variants={item}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <img 
                src={study.image} 
                alt={study.title} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white bg-[#FF6B00] px-3 py-1 rounded-full text-sm inline-block mb-2 w-max">
                  {study.category}
                </span>
                <h3 className="text-white font-poppins font-semibold text-xl mb-2">{study.title}</h3>
                <p className="text-white text-sm mb-4">
                  {study.description}
                </p>
                <a href="#" className="text-white font-medium flex items-center">
                  View Case Study 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline"
            className="bg-white border-2 border-[#FF6B00] text-[#FF6B00] font-medium py-3 px-8 rounded-full hover:bg-[#FF6B00] hover:text-white transition-colors h-auto"
          >
            View All Case Studies
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
