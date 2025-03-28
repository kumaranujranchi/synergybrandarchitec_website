import { motion } from "framer-motion";

export default function ClientLogos() {
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
    <section className="py-10 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600 mb-8 font-inter">Trusted by leading companies in Patna and beyond</p>
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-24 h-12 bg-white rounded shadow-sm flex items-center justify-center"
              variants={item}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <span className="text-gray-400 font-medium">Client {i + 1}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
