import { Link } from "wouter";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { useEffect } from "react";

// Add type declaration for PayPal
declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (selector: string) => void;
      };
    };
  }
}

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 mb-4">
    <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-1" />
    <span>{text}</span>
  </div>
);

export default function StartupPlan() {
  // Initialize PayPal buttons when component mounts
  useEffect(() => {
    // Function to render PayPal buttons when the SDK is loaded
    const renderPayPalButtons = () => {
      if (typeof window !== 'undefined' && window.paypal) {
        try {
          // Check if containers exist before rendering
          const mainContainer = document.querySelector("#paypal-container-4ATRYI68BMDPC");
          const altContainer = document.querySelector("#paypal-container-4ATRYI68BMDPC-alt");
          
          if (mainContainer) {
            window.paypal.HostedButtons({
              hostedButtonId: "4ATRYI68BMDPC"
            }).render("#paypal-container-4ATRYI68BMDPC");
          }
          
          if (altContainer) {
            window.paypal.HostedButtons({
              hostedButtonId: "4ATRYI68BMDPC"
            }).render("#paypal-container-4ATRYI68BMDPC-alt");
          }
        } catch (error) {
          console.log("PayPal button rendering error:", error);
        }
      }
    };
    
    // Check if PayPal SDK is already loaded
    if (window.paypal) {
      renderPayPalButtons();
    } else {
      // Add listener for PayPal SDK load event
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (paypalScript) {
        paypalScript.addEventListener('load', renderPayPalButtons);
      }
      
      // Fallback: try again after a delay to ensure DOM is loaded
      setTimeout(renderPayPalButtons, 2000);
    }
    
    // Cleanup function
    return () => {
      const paypalScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (paypalScript) {
        paypalScript.removeEventListener('load', renderPayPalButtons);
      }
    };
  }, []);

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
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="white"/>
                        <path d="M14.89 18.75H11.36C9.12 18.75 7.28 16.92 7.28 14.68V9.33C7.28 9.06 7.5 8.83 7.78 8.83C8.06 8.83 8.28 9.06 8.28 9.33V14.68C8.28 16.36 9.65 17.75 11.36 17.75H14.89C15.16 17.75 15.39 17.97 15.39 18.25C15.39 18.53 15.17 18.75 14.89 18.75Z" fill="white"/>
                        <path d="M16.15 10.02H14.89C13.17 10.02 11.8 8.65 11.8 6.93V5.67C11.8 5.46 11.92 5.28 12.11 5.21C12.3 5.14 12.51 5.19 12.65 5.33L16.48 9.16C16.62 9.3 16.67 9.52 16.6 9.7C16.53 9.88 16.35 10.02 16.15 10.02ZM12.8 6.59V6.93C12.8 8.09 13.73 9.02 14.89 9.02H15.23L12.8 6.59Z" fill="white"/>
                      </svg>
                      Indian Users - Pay ₹2,000 Advance
                    </span>
                  </Button>
                </a>
                <a href="https://www.paypal.com/paypalme/synergybrandarch/30" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#0070BA] hover:bg-[#003087] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                    <span className="flex items-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M20.1091 7.13678C20.1941 6.61178 20.1091 6.23878 19.8959 5.87878C19.4094 5.03278 18.3019 4.76978 16.9254 4.76978H11.8744C11.5674 4.76978 11.3041 4.98378 11.2616 5.28678L9.66462 15.5468C9.63862 15.7258 9.77462 15.8868 9.95461 15.8868H12.0539L11.8744 17.0218C11.8484 17.1738 11.9669 17.3098 12.1204 17.3098H13.9399C14.2044 17.3098 14.4334 17.1218 14.4674 16.8578L14.4929 16.7218L14.9029 14.0458L14.9349 13.8748C14.9689 13.6108 15.1979 13.4228 15.4624 13.4228H15.7694C17.8789 13.4228 19.4944 12.6708 20.0599 10.2188C20.2904 9.18578 20.2054 8.32778 19.7144 7.72778C19.5524 7.53578 19.3479 7.31978 19.1091 7.13678Z" fill="white"/>
                        <path d="M9.11761 5.28778C9.16011 5.00678 9.41861 4.77078 9.72561 4.77078H14.7766C15.1891 4.77078 15.5591 4.81278 15.8831 4.90778C16.0281 4.95078 16.1646 5.00678 16.2926 5.06878C16.4121 5.11178 16.5231 5.16778 16.6341 5.22278C16.6851 5.25378 16.7361 5.28778 16.7786 5.32178C16.9301 5.42778 17.0666 5.54478 17.1776 5.67278C17.6086 5.16778 17.6086 5.16778 17.1776 5.67278C17.3716 5.88678 17.5231 6.13378 17.6171 6.41478C17.8391 7.01478 17.8391 7.73978 17.6086 8.58678C17.3461 9.54078 16.8536 10.3178 16.2161 10.8228C16.4206 10.6778 16.0281 10.9988 15.9346 11.0538C15.8321 11.1098 15.7211 11.1658 15.6016 11.2128C15.3901 11.3108 15.1551 11.3838 14.8991 11.4318C14.5716 11.4968 14.2016 11.5278 13.7976 11.5278H13.3796C13.1666 11.5278 12.9621 11.5968 12.7916 11.7178C12.6126 11.8388 12.4696 12.0188 12.4186 12.2308L12.3931 12.3688L11.8831 15.5478L11.8661 15.6378C11.8661 15.6528 11.8576 15.6678 11.8576 15.6678H9.76811C9.58711 15.6678 9.45112 15.5058 9.47712 15.3278L11.0741 5.06778C11.0741 5.05678 11.0656 5.04478 11.0656 5.03378C11.0401 4.98378 9.11761 5.28778 9.11761 5.28778Z" fill="#003087"/>
                        <path d="M17.1605 5.67278C17.0495 5.54478 16.913 5.42778 16.77 5.32178C16.719 5.28778 16.668 5.25378 16.617 5.22278C16.506 5.16778 16.395 5.11178 16.2755 5.06878C16.1475 5.00678 16.011 4.95078 15.866 4.90778C15.542 4.81278 15.1635 4.77078 14.751 4.77078H9.7085C9.40151 4.77078 9.14301 4.99578 9.10051 5.28778C9.10051 5.28778 9.08551 5.42778 9.05351 5.66478L8.58301 8.69278C8.58301 8.69278 8.57551 8.69978 8.58301 8.69278C8.56551 8.81778 8.59751 8.94578 8.67101 9.05178C8.75551 9.16878 8.88301 9.23578 9.02751 9.23578H10.9565C11.025 9.23578 11.084 9.28578 11.0925 9.35578V9.38678L10.6815 11.8478C10.673 11.9158 10.7155 11.9748 10.784 11.9748H12.0085C12.077 11.9748 12.136 11.9248 12.1445 11.8568V11.8318L12.57 9.23578H14.19C16.2995 9.23578 17.915 8.48378 18.4805 6.03178C18.702 5.01078 18.617 4.13978 18.126 3.56078C17.964 3.36078 17.77 3.17178 17.5315 3.00078C17.1605 5.67278 17.1605 5.67278 17.1605 5.67278Z" fill="#0070BA"/>
                      </svg>
                      International - Pay $30 via PayPal
                    </span>
                  </Button>
                </a>
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
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
                  
                  <div className="mb-4">
                    <h4 className="text-center font-medium mb-3">Choose Payment Method</h4>
                    
                    <div className="flex flex-col space-y-4">
                      {/* Indian Customers - Razorpay */}
                      <div>
                        <p className="text-sm text-center mb-2 text-gray-600">For Indian Customers</p>
                        <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
                          <button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L20.3 9.7a2.4 2.4 0 0 0 0-3.4L17.7 3.7a2.4 2.4 0 0 0-3.4 0L3.7 14.3a2.4 2.4 0 0 0 0 3.4z"></path><path d="m7.5 12.5 4 4"></path><path d="m16.5 15.5.5.5"></path><path d="m10 8 .5.5"></path><path d="m13 11 .5.5"></path></svg>
                            Pay ₹2,000 via Razorpay
                          </button>
                        </a>
                        <p className="text-xs text-center mt-1 text-gray-500">
                          Secured by Razorpay
                        </p>
                      </div>
                      
                      {/* International Customers - PayPal */}
                      <div>
                        <p className="text-sm text-center mb-2 text-gray-600">For International Customers</p>
                        <div className="mb-1">
                          <a href="https://www.paypal.com/paypalme/synergybrandarch/30" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-[#0070BA] hover:bg-[#003087] text-white py-3 px-4 rounded-lg font-medium transition-all">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                              <path d="M20.1091 7.13678C20.1941 6.61178 20.1091 6.23878 19.8959 5.87878C19.4094 5.03278 18.3019 4.76978 16.9254 4.76978H11.8744C11.5674 4.76978 11.3041 4.98378 11.2616 5.28678L9.66462 15.5468C9.63862 15.7258 9.77462 15.8868 9.95461 15.8868H12.0539L11.8744 17.0218C11.8484 17.1738 11.9669 17.3098 12.1204 17.3098H13.9399C14.2044 17.3098 14.4334 17.1218 14.4674 16.8578L14.4929 16.7218L14.9029 14.0458L14.9349 13.8748C14.9689 13.6108 15.1979 13.4228 15.4624 13.4228H15.7694C17.8789 13.4228 19.4944 12.6708 20.0599 10.2188C20.2904 9.18578 20.2054 8.32778 19.7144 7.72778C19.5524 7.53578 19.3479 7.31978 19.1091 7.13678Z" fill="white"/>
                              <path d="M9.11761 5.28778C9.16011 5.00678 9.41861 4.77078 9.72561 4.77078H14.7766C15.1891 4.77078 15.5591 4.81278 15.8831 4.90778C16.0281 4.95078 16.1646 5.00678 16.2926 5.06878C16.4121 5.11178 16.5231 5.16778 16.6341 5.22278C16.6851 5.25378 16.7361 5.28778 16.7786 5.32178C16.9301 5.42778 17.0666 5.54478 17.1776 5.67278C17.6086 5.16778 17.6086 5.16778 17.1776 5.67278C17.3716 5.88678 17.5231 6.13378 17.6171 6.41478C17.8391 7.01478 17.8391 7.73978 17.6086 8.58678C17.3461 9.54078 16.8536 10.3178 16.2161 10.8228C16.4206 10.6778 16.0281 10.9988 15.9346 11.0538C15.8321 11.1098 15.7211 11.1658 15.6016 11.2128C15.3901 11.3108 15.1551 11.3838 14.8991 11.4318C14.5716 11.4968 14.2016 11.5278 13.7976 11.5278H13.3796C13.1666 11.5278 12.9621 11.5968 12.7916 11.7178C12.6126 11.8388 12.4696 12.0188 12.4186 12.2308L12.3931 12.3688L11.8831 15.5478L11.8661 15.6378C11.8661 15.6528 11.8576 15.6678 11.8576 15.6678H9.76811C9.58711 15.6678 9.45112 15.5058 9.47712 15.3278L11.0741 5.06778C11.0741 5.05678 11.0656 5.04478 11.0656 5.03378C11.0401 4.98378 9.11761 5.28778 9.11761 5.28778Z" fill="#003087"/>
                              <path d="M17.1605 5.67278C17.0495 5.54478 16.913 5.42778 16.77 5.32178C16.719 5.28778 16.668 5.25378 16.617 5.22278C16.506 5.16778 16.395 5.11178 16.2755 5.06878C16.1475 5.00678 16.011 4.95078 15.866 4.90778C15.542 4.81278 15.1635 4.77078 14.751 4.77078H9.7085C9.40151 4.77078 9.14301 4.99578 9.10051 5.28778C9.10051 5.28778 9.08551 5.42778 9.05351 5.66478L8.58301 8.69278C8.58301 8.69278 8.57551 8.69978 8.58301 8.69278C8.56551 8.81778 8.59751 8.94578 8.67101 9.05178C8.75551 9.16878 8.88301 9.23578 9.02751 9.23578H10.9565C11.025 9.23578 11.084 9.28578 11.0925 9.35578V9.38678L10.6815 11.8478C10.673 11.9158 10.7155 11.9748 10.784 11.9748H12.0085C12.077 11.9748 12.136 11.9248 12.1445 11.8568V11.8318L12.57 9.23578H14.19C16.2995 9.23578 17.915 8.48378 18.4805 6.03178C18.702 5.01078 18.617 4.13978 18.126 3.56078C17.964 3.36078 17.77 3.17178 17.5315 3.00078C17.1605 5.67278 17.1605 5.67278 17.1605 5.67278Z" fill="#0070BA"/>
                            </svg>
                            Pay $30 via PayPal
                          </a>
                        </div>
                        <div id="paypal-container-4ATRYI68BMDPC" className="hidden"></div>
                        <p className="text-xs text-center mt-1 text-gray-500">
                          Secured by PayPal - International transactions only
                        </p>
                      </div>
                    </div>
                  </div>
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
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#FF6B00] hover:bg-gray-50 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                  Pay via Razorpay (Indian Customers)
                </Button>
              </a>
              <a href="/#contact">
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                  Book Your Free Session
                </Button>
              </a>
            </div>
            
            <div className="mx-auto max-w-md">
              <p className="text-white mb-2 font-medium">For International Customers:</p>
              <div className="bg-white p-2 rounded-lg">
                <a href="https://www.paypal.com/paypalme/synergybrandarch/30" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-[#0070BA] hover:bg-[#003087] text-white py-3 px-4 rounded-lg font-medium transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M20.1091 7.13678C20.1941 6.61178 20.1091 6.23878 19.8959 5.87878C19.4094 5.03278 18.3019 4.76978 16.9254 4.76978H11.8744C11.5674 4.76978 11.3041 4.98378 11.2616 5.28678L9.66462 15.5468C9.63862 15.7258 9.77462 15.8868 9.95461 15.8868H12.0539L11.8744 17.0218C11.8484 17.1738 11.9669 17.3098 12.1204 17.3098H13.9399C14.2044 17.3098 14.4334 17.1218 14.4674 16.8578L14.4929 16.7218L14.9029 14.0458L14.9349 13.8748C14.9689 13.6108 15.1979 13.4228 15.4624 13.4228H15.7694C17.8789 13.4228 19.4944 12.6708 20.0599 10.2188C20.2904 9.18578 20.2054 8.32778 19.7144 7.72778C19.5524 7.53578 19.3479 7.31978 19.1091 7.13678Z" fill="white"/>
                    <path d="M9.11761 5.28778C9.16011 5.00678 9.41861 4.77078 9.72561 4.77078H14.7766C15.1891 4.77078 15.5591 4.81278 15.8831 4.90778C16.0281 4.95078 16.1646 5.00678 16.2926 5.06878C16.4121 5.11178 16.5231 5.16778 16.6341 5.22278C16.6851 5.25378 16.7361 5.28778 16.7786 5.32178C16.9301 5.42778 17.0666 5.54478 17.1776 5.67278C17.6086 5.16778 17.6086 5.16778 17.1776 5.67278C17.3716 5.88678 17.5231 6.13378 17.6171 6.41478C17.8391 7.01478 17.8391 7.73978 17.6086 8.58678C17.3461 9.54078 16.8536 10.3178 16.2161 10.8228C16.4206 10.6778 16.0281 10.9988 15.9346 11.0538C15.8321 11.1098 15.7211 11.1658 15.6016 11.2128C15.3901 11.3108 15.1551 11.3838 14.8991 11.4318C14.5716 11.4968 14.2016 11.5278 13.7976 11.5278H13.3796C13.1666 11.5278 12.9621 11.5968 12.7916 11.7178C12.6126 11.8388 12.4696 12.0188 12.4186 12.2308L12.3931 12.3688L11.8831 15.5478L11.8661 15.6378C11.8661 15.6528 11.8576 15.6678 11.8576 15.6678H9.76811C9.58711 15.6678 9.45112 15.5058 9.47712 15.3278L11.0741 5.06778C11.0741 5.05678 11.0656 5.04478 11.0656 5.03378C11.0401 4.98378 9.11761 5.28778 9.11761 5.28778Z" fill="#003087"/>
                    <path d="M17.1605 5.67278C17.0495 5.54478 16.913 5.42778 16.77 5.32178C16.719 5.28778 16.668 5.25378 16.617 5.22278C16.506 5.16778 16.395 5.11178 16.2755 5.06878C16.1475 5.00678 16.011 4.95078 15.866 4.90778C15.542 4.81278 15.1635 4.77078 14.751 4.77078H9.7085C9.40151 4.77078 9.14301 4.99578 9.10051 5.28778C9.10051 5.28778 9.08551 5.42778 9.05351 5.66478L8.58301 8.69278C8.58301 8.69278 8.57551 8.69978 8.58301 8.69278C8.56551 8.81778 8.59751 8.94578 8.67101 9.05178C8.75551 9.16878 8.88301 9.23578 9.02751 9.23578H10.9565C11.025 9.23578 11.084 9.28578 11.0925 9.35578V9.38678L10.6815 11.8478C10.673 11.9158 10.7155 11.9748 10.784 11.9748H12.0085C12.077 11.9748 12.136 11.9248 12.1445 11.8568V11.8318L12.57 9.23578H14.19C16.2995 9.23578 17.915 8.48378 18.4805 6.03178C18.702 5.01078 18.617 4.13978 18.126 3.56078C17.964 3.36078 17.77 3.17178 17.5315 3.00078C17.1605 5.67278 17.1605 5.67278 17.1605 5.67278Z" fill="#0070BA"/>
                  </svg>
                  Pay $30 via PayPal
                </a>
                <div id="paypal-container-4ATRYI68BMDPC-alt" className="hidden"></div>
              </div>
              <p className="text-xs text-center mt-1 text-white">
                Secured by PayPal - International transactions only
              </p>
            </div>
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