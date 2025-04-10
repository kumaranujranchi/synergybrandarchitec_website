import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ArrowRight } from "lucide-react";

export default function StartupPlan() {
  return (
    <div className="flex flex-col min-h-screen font-inter text-[#333333] bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-r from-[#FF6B00]/5 to-[#0066CC]/5 overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] font-medium mb-6">
                Special Initiative for Small Businesses
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-[#FF6B00] font-poppins">Ab India Banega Fully Digital</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                Get a professional, custom-coded website at just <span className="font-bold text-[#0066CC]">₹15,000</span> - empowering small businesses to go digital affordably.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["100% custom code", "Mobile responsive design", "SEO-optimized architecture"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-4">
                <a href="#payment-options" className="inline-block w-full sm:w-auto">
                  <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-6 px-8 rounded-lg transition-all hover:shadow-lg w-full sm:w-auto text-lg">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <CheckCircle2 className="text-green-500 h-4 w-4" />
                  <span>Pay just ₹2,000 advance to start your project</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-center text-[#0066CC]">The Startup Package</h3>
                <div className="flex justify-center mb-6">
                  <div className="flex items-start">
                    <span className="text-3xl font-bold">₹</span>
                    <span className="text-5xl font-bold">15,000</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Custom-coded website (not WordPress/Wix)",
                    "Up to 5 pages (Home, About, Services, etc.)",
                    "Mobile-responsive design",
                    "SEO optimization",
                    "Social media links integration",
                    "Contact form setup",
                    "Whatsapp button integration",
                    "Google Analytics setup",
                    "Free logo design consultation"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#payment-options" className="block">
                  <Button className="w-full py-5 bg-[#0066CC] hover:bg-[#0055AA] text-white rounded-lg font-medium text-lg">
                    Choose Payment Method
                  </Button>
                </a>
                <p className="text-center text-sm text-gray-500 mt-3">
                  Pay just ₹2,000 as advance to get started
                </p>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-6 left-6 w-full h-full bg-[#FF6B00]/10 rounded-xl -z-0"></div>
              <div className="absolute top-3 left-3 w-full h-full bg-[#0066CC]/10 rounded-xl -z-0"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0066CC]/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>
      </section>
      
      {/* Why This Initiative */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 font-poppins">Why This Initiative Matters</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
              <p className="text-lg text-gray-700">
                In today's digital world, having a professional online presence is essential. But many small businesses 
                can't afford expensive web development, while DIY solutions often look unprofessional.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Bridging the Digital Divide",
                  description: "Making technology accessible to businesses of all sizes, regardless of budget constraints.",
                  icon: "🌉"
                },
                {
                  title: "Professional Quality",
                  description: "Enterprise-grade technology at a fraction of the typical market price.",
                  icon: "⭐"
                },
                {
                  title: "Digital Empowerment",
                  description: "Helping local entrepreneurs compete effectively in an increasingly online world.",
                  icon: "💪"
                }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-[#0066CC]/5 p-8 rounded-xl border border-[#0066CC]/10">
              <h3 className="text-2xl font-semibold mb-4 text-[#0066CC] text-center">
                We're making high-quality web development affordable for everyone
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-medium mb-3 border-b border-gray-100 pb-2">Typical Agency Price</h4>
                  <p className="text-3xl font-bold text-gray-400 mb-2">₹50,000 - ₹1,00,000+</p>
                  <p className="text-gray-500 text-sm">Out of reach for most small businesses</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-green-100 shadow-sm">
                  <h4 className="text-lg font-medium mb-3 border-b border-gray-100 pb-2">Our Initiative Price</h4>
                  <p className="text-3xl font-bold text-[#FF6B00] mb-2">₹15,000</p>
                  <p className="text-green-600 text-sm">Affordable for growing businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Perfect For */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">Perfect For These Businesses</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              Our digital initiative is specially designed for businesses that need to establish 
              an online presence quickly, professionally, and affordably.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Small Retailers & Shops",
                desc: "Local stores looking to reach customers online"
              },
              {
                title: "Service Providers",
                desc: "Professionals like tutors, repairmen, consultants"
              },
              {
                title: "New Entrepreneurs",
                desc: "First-time business owners with limited budgets"
              },
              {
                title: "Home-Based Businesses",
                desc: "Small operations ready to expand their reach"
              },
              {
                title: "Traditional Businesses",
                desc: "Established businesses going digital for the first time"
              },
              {
                title: "Community Organizations",
                desc: "NGOs and local groups with limited resources"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-[#FF6B00]/10 p-2 rounded-full mt-1">
                    <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">What You Get</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              A complete, professional website solution with everything you need to establish your online presence.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 order-2 lg:order-1">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-[#0066CC]">Website Features</h3>
                      <ul className="space-y-4">
                        {[
                          "100% custom code (not WordPress/Wix)",
                          "Mobile-responsive design",
                          "Up to 5 pages (Home, About, Services, etc.)",
                          "SEO-optimized structure",
                          "Fast loading speed",
                          "Contact form with email integration",
                          "Social media links",
                          "WhatsApp business integration",
                          "Google Maps integration (if needed)",
                          "Google Analytics setup",
                          "Browser compatibility (all major browsers)"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 text-[#0066CC]">Service Benefits</h3>
                      <ul className="space-y-4">
                        {[
                          "Free consultation session",
                          "Custom design based on your brand",
                          "Content guidance",
                          "Unlimited revisions during development",
                          "Technical support for 30 days",
                          "Domain & hosting guidance",
                          "Basic SEO setup",
                          "Loading speed optimization",
                          "Secure website (HTTPS)",
                          "Professional business email setup guide",
                          "Post-launch support"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-[#0066CC]">Upgrade Options</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-gray-700">
                            <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                              <CheckCircle2 className="text-[#FF6B00] w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Fast-Track Delivery</p>
                              <p className="text-sm text-gray-600">Get your site in just 72 hours <span className="text-[#FF6B00]">+₹6,999</span></p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2 text-gray-700">
                            <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                              <CheckCircle2 className="text-[#FF6B00] w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Source Code Access</p>
                              <p className="text-sm text-gray-600">For your developer to maintain <span className="text-[#FF6B00]">Price varies</span></p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Price Card */}
              <div className="lg:col-span-4 order-1 lg:order-2">
                <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 sticky top-24">
                  <div className="bg-gradient-to-r from-[#0066CC] to-[#004999] p-6 text-white text-center">
                    <p className="uppercase text-sm font-semibold tracking-wider mb-1 opacity-90">One-time payment</p>
                    <div className="text-4xl font-bold mb-1">₹15,000</div>
                    <p className="text-sm opacity-90">Complete Website Package</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6 bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                      <p className="text-green-700 font-medium">
                        Pay just ₹2,000 advance to get started!
                      </p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                        <span>No monthly fees</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                        <span>No hidden charges</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                        <span>Free post-launch support (30 days)</span>
                      </li>
                    </ul>
                    
                    <div className="border-t border-gray-100 pt-4 mb-6">
                      <p className="text-sm text-gray-500 mb-2">Timeline: 10-14 working days</p>
                      <p className="text-sm text-gray-500">Payment via Razorpay secure gateway</p>
                    </div>
                    
                    <a href="#payment-options" className="block">
                      <Button className="w-full py-5 bg-[#FF6B00] hover:bg-[#FF8533] text-white rounded-lg font-medium text-lg">
                        Get Started Today
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">How It Works</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              Our seamless process takes you from concept to launch with minimal effort on your part.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[24px] top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              
              <div className="space-y-12">
                {[
                  {
                    step: 1,
                    title: "Initial Consultation",
                    description: "We'll discuss your business needs, goals, and vision for your website in a free consultation call."
                  },
                  {
                    step: 2,
                    title: "Proposal & Payment",
                    description: "After understanding your requirements, you'll receive a detailed proposal. Pay the ₹2,000 advance to start."
                  },
                  {
                    step: 3,
                    title: "Design & Development",
                    description: "Our team creates your website's design based on your brand, then builds it with clean, efficient code."
                  },
                  {
                    step: 4,
                    title: "Review & Revisions",
                    description: "You'll review the website and request any changes needed. We'll refine until you're completely satisfied."
                  },
                  {
                    step: 5,
                    title: "Final Payment & Launch",
                    description: "Once approved, you make the final payment, and we launch your website for the world to see."
                  },
                  {
                    step: 6,
                    title: "Post-Launch Support",
                    description: "We provide 30 days of free technical support to ensure everything runs smoothly after launch."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[#0066CC] text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">
                      {item.step}
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              Common questions about our startup website package.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "What's not included in the price?",
                  a: "Domain registration and hosting fees are not included. However, we'll guide you through purchasing these affordably (typically ₹1,000-2,000/year)."
                },
                {
                  q: "How long will it take to build my website?",
                  a: "Standard delivery is 10-14 working days. If you need it faster, our express service delivers in just 72 hours for an additional fee."
                },
                {
                  q: "Will my website work on mobile devices?",
                  a: "Absolutely! All our websites are fully responsive and optimized for all devices - mobile phones, tablets, and desktops."
                },
                {
                  q: "Do I need technical knowledge?",
                  a: "Not at all. We handle all the technical aspects. You just need to provide your content and feedback on designs."
                },
                {
                  q: "Can I update the website myself later?",
                  a: "Yes, we can build your site with a simple content management system if requested, allowing you to make basic updates."
                },
                {
                  q: "What if I need changes after the website is complete?",
                  a: "We include 30 days of free support. After that, we offer affordable maintenance packages or can make one-off changes for a reasonable fee."
                },
                {
                  q: "How do I pay the remaining amount?",
                  a: "After you approve the design, you'll be sent a secure payment link for the remaining balance before the site goes live."
                },
                {
                  q: "What do I need to provide?",
                  a: "Basic business information, your logo (or we can help design one), images, and text content for your pages."
                }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-[#0066CC]">{item.q}</h3>
                  <p className="text-gray-700">{item.a}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a href="/#contact">
                <Button variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials/Why Us */}
      <section className="py-20 bg-[#0066CC]/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">Why Choose Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              We're committed to making quality web development accessible to small businesses across India.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Professional Quality",
                  description: "We don't compromise on quality despite our affordable pricing. Your website will be built with the same professional standards used for enterprise clients.",
                  icon: "🏆"
                },
                {
                  title: "Technical Excellence",
                  description: "Our team uses modern web technologies to ensure your site is fast, secure, and reliable – no WordPress vulnerabilities or template limitations.",
                  icon: "⚙️"
                },
                {
                  title: "Customer-Focused",
                  description: "We prioritize clear communication and your satisfaction. Our process is transparent, and we're always available to answer your questions.",
                  icon: "🤝"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6 text-center text-[#0066CC]">
                A Mission-Driven Initiative
              </h3>
              <p className="text-lg mb-6 text-center">
                This isn't just a business for us – it's a mission to digitally empower small businesses across India.
              </p>
              <div className="border-t border-gray-100 pt-6">
                <p className="text-gray-700 italic">
                  "At Synergy Brand Architect, we believe that every business deserves a professional online presence, 
                  regardless of size or budget. That's why we've created this special initiative – to level the 
                  playing field and help small businesses compete in the digital world."
                </p>
                <p className="mt-4 font-medium">— Synergy Brand Architect Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Payment Options */}
      <section id="payment-options" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 font-poppins">Ready to Get Started?</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl">
              Pay just ₹2,000 advance to secure your spot in our development queue and begin your digital journey today.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Razorpay Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-[#2d84fb] to-[#1a73e8] p-6 text-white">
                <h3 className="text-xl font-semibold">Secure Payment via Razorpay</h3>
                <p className="text-sm opacity-90 mt-1">
                  India's trusted payment gateway
                </p>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                  <p className="text-blue-800 font-medium">
                    Pay ₹2,000 - ₹15,000 through Razorpay
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Choose your amount on the payment page
                  </p>
                </div>
                
                <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <button className="w-full bg-[#2d84fb] hover:bg-[#1a73e8] text-white font-medium py-4 px-4 rounded-lg transition-all flex items-center justify-center">
                    <img src="https://i.imgur.com/3g7nmJC.png" alt="Razorpay" className="h-6 mr-2" />
                    Pay with Razorpay
                  </button>
                </a>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                    <span>UPI, Credit/Debit Cards, NetBanking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                    <span>Secure payment gateway</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                    <span>Instant receipt via email</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
              <h3 className="text-lg font-semibold mb-2">Need a Different Payment Option?</h3>
              <p className="text-gray-700 mb-4">
                Contact us to discuss alternative payment methods or installment plans.
              </p>
              <a href="/#contact">
                <Button className="bg-[#0066CC] hover:bg-[#0055AA]">
                  Contact Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Let's Make India Fully Digital – One Business at a Time</h2>
          <p className="text-lg max-w-3xl mx-auto mb-10">
            Whether you're in Patna or Pune, Darbhanga or Delhi, this is your time.
            Take the leap, go online, and let the world discover the value you offer.
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Start Your Digital Journey Today</h3>
                <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <button className="w-full bg-[#2d84fb] hover:bg-[#1a73e8] text-white font-medium py-4 px-4 rounded-lg transition-all flex items-center justify-center">
                    <img src="https://i.imgur.com/3g7nmJC.png" alt="Razorpay" className="h-6 mr-2" />
                    Pay with Razorpay
                  </button>
                </a>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Secured by Razorpay - Pay ₹2,000 advance
                </p>
              </div>
            </div>
          </div>
          
          <p className="mt-10 text-2xl font-bold">
            Ab India Banega Fully Digital – Join the Movement Today!
          </p>
          
          <p className="mt-4 text-sm opacity-80">Limited slots available each month</p>
          
          <div className="mt-8">
            <a href="/#contact">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                Book Your Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}