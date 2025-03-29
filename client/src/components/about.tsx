import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

export default function About() {
  const features = [
    "Strategic brand positioning & development",
    "Creative design solutions for all touchpoints",
    "Comprehensive digital marketing campaigns",
    "Data-driven growth strategies",
    "Local market expertise in Patna",
    "Personalized client-focused approach"
  ];

  const values = [
    {
      title: "Integrity",
      description: "Honest advice, transparent processes, and keeping our promises. If something isn't right for you, we'll tell you – even if it means less business for us."
    },
    {
      title: "Growth-Focus",
      description: "We're obsessed with measuring and improving results. Every strategy we develop aims at one thing: growing your brand and business."
    },
    {
      title: "Innovation",
      description: "Digital marketing evolves rapidly, and so do we. We're constantly learning and implementing the latest effective techniques to keep you ahead."
    },
    {
      title: "Local Insight",
      description: "We understand Bihar's unique business ecosystem and cultural nuances, allowing us to create marketing that resonates with your local audience."
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">About Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-inter">
            Leading Brand Building Agency in Patna
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
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
                src="//images.unsplash.com/photo-1536599018102-9f803c140fc1" 
                alt="Aerial view of Patna city and Ganges river, highlighting Synergy's local roots in Bihar" 
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
            <h2 className="font-poppins font-semibold text-3xl mb-6 text-[#333333]">Who We Are</h2>
            <p className="text-gray-600 mb-6 font-inter">
              Synergy Brand Architect is a results-driven B2B brand building agency based in Patna. Founded in 2020, our mission is simple: to empower small and medium businesses in Bihar with big-brand strategies. We noticed that many local businesses have amazing products and services but struggle to shine in the market.
            </p>
            <p className="text-gray-600 mb-8 font-inter">
              That's where Synergy comes in – we bridge the gap between where you are now and where you aspire to be, through smart branding and cutting-edge digital marketing. We take pride in being a homegrown agency. Patna is our home, and we're passionate about helping fellow businesses here thrive.
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
          </motion.div>
        </div>
        
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl mb-10 text-[#333333] text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="w-12 h-12 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center mb-4">
                  <span className="text-[#FF6B00] font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="font-poppins font-medium text-xl mb-3 text-[#333333]">{value.title}</h3>
                <p className="text-gray-600 font-inter">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="mt-16 bg-[#F5F7FA] p-8 rounded-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <img 
                src="//randomuser.me/api/portraits/men/32.jpg" 
                alt="Client Testimonial" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="md:w-3/4 md:pl-8">
              <div className="flex text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-4 font-inter">
                "Synergy helped us increase our online leads by 300% in just 6 months! Their team truly delivers on their promises. We went from virtually invisible online to becoming a go-to name in our industry."
              </p>
              <p className="font-medium text-[#333333]">Lawkush Sharma</p>
              <p className="text-sm text-gray-500">Director at Wishluv Buildcon Pvt. Ltd. (Real Estate)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}