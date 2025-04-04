import { Link } from "wouter";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 mb-4">
    <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-1" />
    <span>{text}</span>
  </div>
);

export default function StartupPlan() {
  return (
    <div className="flex flex-col min-h-screen font-inter text-[#333333]">
      <Header />
      <main className="flex-grow pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6B00]/10 to-[#0066CC]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#FF6B00] font-poppins">Ab India Banega Fully Digital</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl">
              A Special Initiative to Empower Small Businesses with Affordable, Professional Websites
            </p>
            <p className="text-lg max-w-3xl mb-10 text-gray-700">
              In today's digital age, having a website is no longer a luxury — it's a necessity. 
              Yet, for many small businesses and first-time entrepreneurs, going online can seem 
              confusing, expensive, or overwhelming. That's where our initiative comes in.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                  Book Now - Pay ₹2,000 Advance
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md text-lg">
                  View Package Details
                </Button>
              </a>
              <a href="/#contact">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md text-lg">
                  Free Consultation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About The Initiative */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">What Is This Initiative All About?</h2>
            <p className="text-lg mb-8">
              At Synergy Brand Architect, we believe that every India business — no matter how big or small — 
              deserves to shine online. Whether you run a local shop, are launching a startup, or just want to 
              take your traditional business digital, this initiative is made for you.
            </p>
            <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#0066CC]">
                We are offering a fully developed, custom-coded website built on industry-standard technologies – 
                React.js, Node.js, and Express.js – at a super affordable cost of just ₹15,000.
              </h3>
              <p className="text-lg mb-6">Unlike DIY website builders or outdated templates, you get:</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>100% custom code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>Optimized for speed, security, and scalability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>No bloated code, no dependency on platforms like WordPress, Wix, Webflow, or Weebly</span>
                </li>
              </ul>
              <p className="text-lg mt-6">
                This isn't a stripped-down version. It's the real deal – a professional-grade website at a price 
                any growing business can afford.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center font-poppins">Perfect For:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Small shops & local vendors",
              "Service providers (salons, tutors, freelancers, repairmen, consultants)",
              "First-time business owners",
              "Home-based businesses going online",
              "NGOs & community-driven groups",
              "Local brands looking to stand out"
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
                <div className="bg-[#FF6B00]/10 p-2 rounded-full">
                  <CheckCircle2 className="text-[#FF6B00] w-6 h-6" />
                </div>
                <div className="text-lg">{item}</div>
              </div>
            ))}
          </div>
          <p className="text-lg text-center mt-10 max-w-3xl mx-auto">
            We want to digitally empower every corner of India, and we're starting with those who need it the most — YOU.
          </p>
        </div>
      </section>

      {/* Service Package Details */}
      <section className="py-16 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center font-poppins">The Startup Package</h2>
          <p className="text-center mb-8 text-lg max-w-3xl mx-auto">
            Perfect for small businesses and first-time entrepreneurs looking to establish a professional online presence quickly and affordably.
          </p>
          
          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Package Details */}
            <div className="lg:w-2/3 order-2 lg:order-1">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-[#0066CC] to-[#004999] text-white p-6">
                  <h3 className="text-2xl font-bold">What's Included</h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Initial Marketing Audit</h4>
                          <p className="text-sm text-gray-600">Comprehensive review of your current online presence</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Strategy Development</h4>
                          <p className="text-sm text-gray-600">Customized marketing plan for your business goals</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Target Audience Identification</h4>
                          <p className="text-sm text-gray-600">Define your ideal customer profiles</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Social Media Posts</h4>
                          <p className="text-sm text-gray-600">10 custom posts per month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Blog Articles</h4>
                          <p className="text-sm text-gray-600">1 SEO-optimized article per month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Graphic Design</h4>
                          <p className="text-sm text-gray-600">5 custom designs per month</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Social Media Management</h4>
                          <p className="text-sm text-gray-600">2 platforms of your choice</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Basic SEO Optimization</h4>
                          <p className="text-sm text-gray-600">On-page optimization & local search setup</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Analytics & Reporting</h4>
                          <p className="text-sm text-gray-600">Monthly performance reports</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Consultation Calls</h4>
                          <p className="text-sm text-gray-600">1 strategy call per month</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Professional Logo Design</h4>
                          <p className="text-sm text-gray-600">Custom logo creation (1-time)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="bg-[#FF6B00]/10 p-1 rounded-full">
                          <CheckCircle2 className="text-[#FF6B00] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Customer Support</h4>
                          <p className="text-sm text-gray-600">Email & WhatsApp support</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Upgrade Options</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="text-[#FF6B00] w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Fast-Track Delivery</p>
                      <p className="text-sm text-gray-600">Get your package implemented in just 72 hours <span className="text-[#FF6B00]">+₹6,999</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="text-[#FF6B00] w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Additional Social Media Platform</p>
                      <p className="text-sm text-gray-600">Expand your reach with one more platform <span className="text-[#FF6B00]">+₹4,999/month</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="text-[#FF6B00] w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Extra Blog Articles</p>
                      <p className="text-sm text-gray-600">Additional SEO-focused article <span className="text-[#FF6B00]">+₹2,999/article</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Card */}
            <div className="lg:w-1/3 order-1 lg:order-2">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#FF6B00] sticky top-24">
                <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Startup Package</h3>
                    <p className="text-sm opacity-85 mb-2">Perfect for small businesses & entrepreneurs</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-4xl font-bold">₹14,999</span>
                      <span className="opacity-80 text-sm">per month</span>
                    </div>
                    <p className="text-xs opacity-75 mt-1">Or ₹11,999/month with quarterly billing</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-center mb-6 text-gray-600">Great for new businesses looking to establish an online presence.</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>10 social media posts per month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>1 blog article per month</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>2 social media platforms</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>Basic SEO optimization</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>Monthly analytics reports</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-0.5" />
                      <span>Professional logo design (1-time)</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full text-sm font-medium">
                        Popular For
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Small Businesses</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Startups</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Local Shops</span>
                    </div>
                  </div>
                  
                  <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-3 px-4 rounded-lg font-medium transition-all">
                      Book Now - Pay ₹2,000 Advance
                    </button>
                  </a>
                  
                  <p className="text-xs text-center mt-3 text-gray-500">
                    Secure online payment via Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center font-poppins">Additional Options</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">Want It Faster?</h3>
              <p className="text-lg mb-4">
                Add Fast Delivery (within 72 hours) for just ₹6,999 extra and get your site live in no time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">Need the Source Code?</h3>
              <p className="text-lg mb-4">
                We'll provide the complete project source files if you want to manage it yourself or with a developer.
              </p>
              <p className="text-lg italic">
                <span className="inline-block w-5 h-5 text-center text-green-600 font-bold">+</span> On-demand option (Charged based on website size & structure)
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">What's Not Included (But We'll Help You Set It Up)</h3>
              <p className="text-lg mb-4">
                <span className="inline-block w-5 h-5 text-center text-red-500 font-bold">-</span> Domain name (we'll guide you to buy the right one)<br />
                <span className="inline-block w-5 h-5 text-center text-red-500 font-bold">-</span> Hosting (we'll recommend best options suited for your needs)
              </p>
              <p className="text-lg">
                These costs are not included in the ₹15,000 package, but we'll assist you step-by-step in setting them up – no tech knowledge needed!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Doing This */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Why Are We Doing This?</h2>
            <p className="text-lg mb-6">
              We've seen hundreds of amazing businesses with great products and passionate founders — struggling 
              to grow because they lack digital presence. Big agencies are too expensive, and DIY builders 
              aren't scalable or professional.
            </p>
            <p className="text-lg mb-6">
              So, we decided to bridge that gap.
            </p>
            <p className="text-xl font-semibold text-center mb-6">
              This initiative is not about profit — it's about purpose.
            </p>
            <p className="text-lg text-center">
              We're here to level the playing field, ensuring every small business in India has the tools 
              to compete and grow in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Bonus Add-ons */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center font-poppins">Bonus Add-ons (Available on Request)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">App Design Linked to Website</h3>
              <p>Want your customers to use your service via a mobile app? We can do that too.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">Dashboard Integration</h3>
              <p>For future scalability (manage leads, users, etc.)</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">Digital Marketing Support</h3>
              <p>Available for when you're ready to grow bigger</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 bg-[#0066CC]/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">100% Transparent. No Hidden Charges.</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We believe in clarity and honesty. What we offer is what you pay for — and nothing extra behind the scenes. 
            You'll always know the costs upfront.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Let's Talk – Book a Free Consultation Now</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Not sure how to start? Wondering how big your idea can go?
            Let's have a conversation. Our team will explain what's possible and how we can help — no pressure, 
            no sales push, just guidance.
          </p>
          <p className="text-lg mb-10">
            We'll even give you a free project roadmap if you choose to proceed later.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-[#FF6B00] hover:bg-gray-50 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                Book Now - Pay ₹2,000 Advance
              </Button>
            </a>
            <a href="/#contact">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                Book Your Free Session
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm">Slots are limited</p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Let's Make India Fully Digital – One Business at a Time</h2>
          <p className="text-lg max-w-3xl mx-auto mb-10">
            Whether you're in Patna or Pune, Darbhanga or Delhi, this is your time.
            Take the leap, go online, and let the world discover the value you offer.
          </p>
          <p className="text-2xl font-bold text-[#FF6B00]">
            Ab India Banega Fully Digital – Join the Movement Today!
          </p>
        </div>
      </section>
      
      </main>
      {/* Add the Footer component */}
      <Footer />
      <WhatsappButton />
    </div>
  );
}