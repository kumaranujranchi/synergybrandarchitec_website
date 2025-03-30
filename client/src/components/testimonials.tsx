import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content: "Synergy helped us increase our online leads by 300% in just 6 months! Their team truly delivers on their promises. We went from virtually invisible online to becoming a go-to name in our industry.",
    author: "Lawkush Sharma",
    title: "Director at Wishluv Buildcon Pvt. Ltd.",
    industry: "Real Estate",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    content: "The folks at Synergy Brand Architect are amazing listeners and strategists. Thanks to them, our hospital's website now ranks #1 for health services in Patna, and our patient appointments via the site doubled. They are the best digital marketing service in Patna we've worked with.",
    author: "Pranav Kumar",
    title: "Marketing Head at Arbindu Hospitals",
    industry: "Healthcare",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    content: "Working with Synergy has been a game-changer for our brand. They completely revamped our visual identity and digital presence, resulting in a 200% increase in online engagement and significant growth in customer inquiries.",
    author: "Priya Sharma",
    title: "Founder, Artisan Spaces",
    industry: "Interior Design",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    content: "The team at Synergy Brand Architect understands the local Patna market deeply. Their SEO and social media strategies helped us become the leading player in our industry within just one year of collaboration.",
    author: "Amit Verma",
    title: "Director, The Helping Hand",
    industry: "Non-Profit",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Show testimonials in groups of 3 (for desktop) or 1 (for mobile)
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  // Get current page testimonials
  const getCurrentTestimonials = () => {
    const start = activeSlide * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return testimonials.slice(start, end);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <Quote className="h-12 w-12 text-[#FF6B00] opacity-30" />
          </div>
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Don't just take our word for it. Hear from businesses across Patna that have transformed their growth trajectory with our strategic marketing solutions.
          </p>
        </motion.div>
        
        <div className="relative testimonial-carousel">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
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
                <p className="text-gray-600 mb-6 font-inter flex-grow italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center mt-auto">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-[#FF6B00] border-opacity-20"
                  />
                  <div>
                    <h4 className="font-poppins font-medium text-[#333333]">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                    <p className="text-xs text-[#FF6B00] font-medium">{testimonial.industry}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-3">
              {[...Array(totalPages)].map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index ? 'bg-[#FF6B00] opacity-100' : 'bg-gray-300 opacity-50'}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
        
        <motion.div
          className="text-center mt-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#FF6B00] bg-opacity-10 flex items-center justify-center">
              <span className="text-[#FF6B00] font-bold text-2xl">150+</span>
            </div>
          </div>
          <h3 className="font-poppins font-semibold text-2xl mb-4 text-[#333333]">Join Our Growing List of Success Stories</h3>
          <p className="text-gray-600 font-inter">
            Over 150+ businesses in Patna and across Bihar have trusted Synergy Brand Architect to transform their digital presence and drive real growth. Will your business be next?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
