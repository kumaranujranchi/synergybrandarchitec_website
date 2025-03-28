import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Happy Clients" },
  { value: "200%", label: "Average Growth" },
  { value: "500+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" }
];

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.div 
                className="text-4xl md:text-5xl font-poppins font-bold mb-2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
