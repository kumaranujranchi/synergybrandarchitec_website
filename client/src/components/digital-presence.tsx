import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, TrendingUp, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "./count-up";

export default function DigitalPresence() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="overflow-hidden">
      {/* Hero Banner */}
      <div className="relative py-20 lg:py-24 bg-gradient-to-r from-[#0066CC]/90 to-[#004080]/90 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTh2MmgtMnYtMmg5em0tMTAgMGgyek0zNiAxMHYtMmgtMnYyaC00di0yaC0ydjJoLTJ2LTRoMTB2NHptMCA4di00aC0ydjRoLTR2LTRoLTJ2NGgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHptMCA4di00aC0ydjRoLTR2LTRoLTJ2NGgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHptMCA4di0yaC0ydjJoLTR2LTJoLTJ2MmgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-poppins">
              The New Era of Digital Presence
            </h2>
            <h3 className="text-xl md:text-2xl font-medium mb-8 text-white/90">
              Low Cost, High Quality Web Development
            </h3>
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              Helping your business launch in the digital world with the best design, best development, 
              and best results – all at affordable rates.
            </p>
            <a href="#contact">
              <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-8 py-6 rounded-lg text-lg font-medium">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-white/70 mt-4 text-sm">Trusted by 100+ businesses</p>
          </motion.div>
        </div>
      </div>
      
      {/* Why Digital Presence is Crucial */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#333333] font-poppins">
              Why a Digital Presence is a Must Today
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mx-auto mb-6"></div>
            <p className="text-lg text-gray-700">
              In today's interconnected world, your online presence is often the first impression potential customers have of your business.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-[#FF6B00]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#333333]">
                Visibility & Reach
              </h3>
              <p className="text-gray-600">
                Your website connects you to customers 24/7, globally.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-[#0066CC]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#333333]">
                Trust & Credibility
              </h3>
              <p className="text-gray-600">
                A professional online presence builds customer trust and brand credibility.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-[#FF6B00]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#333333]">
                Business Growth
              </h3>
              <p className="text-gray-600">
                Digital transformation helps increase your ROI and customer engagement.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="bg-[#0066CC]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-[#0066CC]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#333333]">
                Competitive Edge
              </h3>
              <p className="text-gray-600">
                Our affordable, high-quality solutions put you ahead of the competition.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Service Highlight */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-[#333333] font-poppins">
                Affordable Excellence in Web Development
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mx-auto mb-6"></div>
            </motion.div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0066CC]">
                  High-Quality Web Solutions That Don't Break the Bank
                </h3>
                <p className="text-gray-700 mb-6">
                  Our focus is on building tailored web solutions that are cost-effective yet uncompromising in quality. 
                  We combine efficient processes, modern design trends, and powerful technologies to give you the best value.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#FF6B00]/10 rounded-full mt-1">
                      <div className="bg-[#FF6B00] rounded-full w-3 h-3"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-[#333333]">Custom Design</p>
                      <p className="text-gray-600">Tailored to your specific business goals and brand identity.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#FF6B00]/10 rounded-full mt-1">
                      <div className="bg-[#FF6B00] rounded-full w-3 h-3"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-[#333333]">Modern Technology</p>
                      <p className="text-gray-600">Responsive, SEO-friendly, fast-loading websites that convert visitors.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="p-1 bg-[#FF6B00]/10 rounded-full mt-1">
                      <div className="bg-[#FF6B00] rounded-full w-3 h-3"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-[#333333]">Post-launch Support</p>
                      <p className="text-gray-600">Ongoing maintenance, updates, and technical assistance when you need it.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="flex h-full">
                    <div className="w-1/2 bg-gradient-to-br from-[#FF6B00]/80 to-[#FF6B00] p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">Low Cost</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Affordable Packages</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Flexible Payment Options</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Value for Money</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>No Hidden Costs</span>
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/2 bg-gradient-to-br from-[#0066CC]/80 to-[#0066CC] p-6 text-white">
                      <h3 className="text-xl font-bold mb-4">High Quality</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Custom-Coded</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Optimized Performance</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>Modern Design Trends</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-xs">✓</span>
                          </div>
                          <span>SEO-Optimized</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -z-10 w-full h-full top-4 left-4 bg-gradient-to-r from-[#FF6B00]/20 to-[#0066CC]/20 rounded-xl"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits & Success Metrics */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#333333] font-poppins">
              Our Clients. Our Success Stories.
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mx-auto mb-6"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Testimonials */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC]"></div>
              
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0066CC]" />
                <span>What Our Clients Say</span>
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-600 italic mb-4">
                    "The team delivered a beautiful website that exceeded our expectations, all while keeping costs affordable. The results have been incredible for our business."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] font-semibold mr-3">
                      RK
                    </div>
                    <div>
                      <p className="font-medium">Rahul Kumar</p>
                      <p className="text-sm text-gray-500">Wishluv Buildcon</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-600 italic mb-4">
                    "Our website looks professional and modern, yet we paid significantly less than what other agencies quoted us. I can't recommend them enough!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0066CC]/20 flex items-center justify-center text-[#0066CC] font-semibold mr-3">
                      PS
                    </div>
                    <div>
                      <p className="font-medium">Priya Sharma</p>
                      <p className="text-sm text-gray-500">The Helping Hand</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Success Metrics */}
            <motion.div
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066CC] to-[#FF6B00]"></div>
              
              <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#FF6B00]" />
                <span>Our Performance</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FF6B00] mb-2">
                    <CountUp end={100} duration={2.5} prefix="+" />
                  </div>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0066CC] mb-2">
                    <CountUp end={95} duration={2.5} suffix="%" />
                  </div>
                  <p className="text-gray-600">Satisfaction Rate</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FF6B00] mb-2">
                    <CountUp end={5} duration={2.5} prefix="+" />
                  </div>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#0066CC] mb-2">
                    <CountUp end={7} duration={2.5} />
                  </div>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-r from-[#0066CC]/90 to-[#004080]/90 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTh2MmgtMnYtMmg5em0tMTAgMGgyek0zNiAxMHYtMmgtMnYyaC00di0yaC0ydjJoLTJ2LTRoMTB2NHptMCA4di00aC0ydjRoLTR2LTRoLTJ2NGgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHptMCA4di00aC0ydjRoLTR2LTRoLTJ2NGgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHptMCA4di0yaC0ydjJoLTR2LTJoLTJ2MmgtMnYtMmgtMnYyaC00di0yaC0ydjJIMTB2LTRoMTB2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business Digitally?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's Get Started Today.
            </p>
            <a href="#contact">
              <Button size="lg" className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-8 py-6 rounded-lg text-lg font-medium">
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}