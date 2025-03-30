import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";

export default function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <motion.div 
          className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-[#333333]">
            Build Your Brand, <span className="text-[#FF6B00]">Grow Your Business</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 font-inter">
            Your One-Stop Digital Marketing Partner in Patna for strategic brand building and growth-focused marketing solutions.
          </p>
          <p className="text-md mb-8 text-gray-600 font-inter">
            Welcome to Synergy Brand Architect, the best digital marketing service in Patna for businesses aiming to make a mark online. We're your dedicated partner in branding and digital growth, helping you stand out in the Bihar market with a powerful online presence.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#contact');
            }}>
              <Button 
                className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 h-auto"
              >
                Get Free Consultation
              </Button>
            </a>
            <a href="#services" onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#services');
            }}>
              <Button
                variant="outline"
                className="border-2 border-[#FF6B00] text-[#FF6B00] font-medium py-3 px-8 rounded-full hover:bg-[#FF6B00] hover:text-white transition-colors h-auto"
              >
                Our Services
              </Button>
            </a>
          </div>
          
          <div className="mt-10 flex items-center">
            <div className="flex -space-x-2">
              <motion.div 
                className="w-10 h-10 rounded-full border-2 border-white bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm"
                whileHover={{ scale: 1.1 }}
              >
                L
              </motion.div>
              <motion.div 
                className="w-10 h-10 rounded-full border-2 border-white bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm"
                whileHover={{ scale: 1.1 }}
              >
                P
              </motion.div>
              <motion.div 
                className="w-10 h-10 rounded-full border-2 border-white bg-[#FF6B00] text-white flex items-center justify-center font-bold text-sm"
                whileHover={{ scale: 1.1 }}
              >
                A
              </motion.div>
            </div>
            <div className="ml-4">
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current" size={16} />
                ))}
              </div>
              <p className="text-sm text-gray-600">From over <span className="font-semibold">150+ satisfied clients</span> across 15+ industries</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-r from-[#0066CC] to-[#4D94FF] rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] rounded-full opacity-20"></div>
            <div className="relative overflow-hidden rounded-xl shadow-lg z-10">
              <div className="w-full carousel">
                <div id="slide1" className="carousel-item relative w-full">
                  <img src="/assets/carousel-image-1.jpg" className="w-full" alt="Business growth and digital marketing"/>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❮</a> 
                    <a href="#slide2" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❯</a>
                  </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                  <img src="/assets/carousel-image-2.jpg" className="w-full" alt="Strategic marketing planning"/>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❮</a> 
                    <a href="#slide3" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❯</a>
                  </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                  <img src="/assets/carousel-image-3.jpg" className="w-full" alt="Content creation and social media marketing"/>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❮</a> 
                    <a href="#slide4" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❯</a>
                  </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                  <img src="/assets/carousel-image-4.jpg" className="w-full" alt="Data analytics and campaign tracking"/>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❮</a> 
                    <a href="#slide1" className="btn btn-circle bg-white/30 hover:bg-white/70 border-none text-gray-800">❯</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
