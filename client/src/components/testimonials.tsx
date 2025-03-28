import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Synergy Brand Architect transformed our business. Their strategic approach to digital marketing helped us reach new customers and increase our revenue by over 150% in just 6 months.",
    author: "Rajesh Kumar",
    title: "CEO, TechSolutions Patna",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "Working with Synergy has been a game-changer for our brand. They completely revamped our visual identity and digital presence, resulting in a 200% increase in online engagement.",
    author: "Priya Sharma",
    title: "Founder, Fashion Boutique",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    content: "The team at Synergy Brand Architect understands the local Patna market deeply. Their SEO and social media strategies helped us become the leading player in our industry within just one year.",
    author: "Amit Verma",
    title: "Director, Real Estate Development",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Don't just take our word for it. Hear from businesses that have transformed their growth trajectory with our help.
          </p>
        </motion.div>
        
        <div className="relative testimonial-carousel">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={16} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 font-inter">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-poppins font-medium text-[#333333]">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index ? 'bg-[#FF6B00] opacity-100' : 'bg-gray-300 opacity-50'}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
