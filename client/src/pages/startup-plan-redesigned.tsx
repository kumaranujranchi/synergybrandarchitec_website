import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

// Define window interface to include PayPal SDK type
declare global {
  interface Window {
    paypal?: {
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (selector: string) => void;
      };
    };
  }
}

export default function StartupPlan() {
  // Initialize PayPal buttons when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA46JlSu95vSvwPthNp764rVwXbjlAcrl9m14280zTpULSFWif3B_4PLEeHivaU3pNYG3Fh-msBXpUFAs&components=hosted-buttons&disable-funding=venmo&currency=USD";
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        try {
          window.paypal.HostedButtons({
            hostedButtonId: "4AT8YJ6R8MDPC"
          }).render("#paypal-container-4AT8YJ6R8MDPC");
        } catch (e) {
          console.error("Error rendering PayPal buttons:", e);
        }
      }
    };
    
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div className="bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-[#0066CC] to-[#0055AA] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
            Startup Plan
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Kickstart your business with a complete digital package. Get a professional online presence, SEO optimization, and ongoing support.
          </p>
        </div>
      </section>
      
      {/* What's Included Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-poppins text-gray-800">
              What's Included in the Startup Plan
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Everything you need to kickstart your online presence, generate leads, and build a credible brand image.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Branding Strategy</h3>
                <p className="text-gray-600">
                  Develop a unique brand identity that resonates with your target audience and differentiates you from competitors.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Responsive Website</h3>
                <p className="text-gray-600">
                  Professional responsive website design with up to 5 pages, optimized for all devices and screen sizes.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">SEO Optimization</h3>
                <p className="text-gray-600">
                  Search engine optimization for better visibility in Google search results and increased organic traffic.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Social Media Setup</h3>
                <p className="text-gray-600">
                  Professional setup of key social media profiles and a strategic guide to build your online presence.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Lead Generation Blueprint</h3>
                <p className="text-gray-600">
                  Strategies and tools to capture and convert website visitors into qualified leads for your business.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Support & Onboarding</h3>
                <p className="text-gray-600">
                  Dedicated support during setup and a smooth onboarding process to get your digital presence up and running fast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Indian Customers Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 text-white">
              <h2 className="text-3xl font-bold mb-6 font-poppins">
                For Indian Customers
              </h2>
              <p className="text-lg max-w-3xl mx-auto">
                Ab India Banega Fully Digital – Join the movement with our special pricing for Indian businesses.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Startup Growth Package</h3>
                  <p className="text-gray-600 mb-6">
                    At Synergy Brand Architect, we're committed to helping your startup take off with the right digital and brand strategies. Our Startup Plan is designed to offer everything you need to kickstart your online presence.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Custom Branding Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Responsive Website (up to 5 pages)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">SEO Optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Social Media Setup & Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Lead Generation Blueprint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Quick onboarding within 24 hours</span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
                    <p className="font-medium text-orange-800">
                      Pay just ₹2,000 as advance to secure your spot
                    </p>
                    <p className="text-sm text-orange-600">
                      Full package options from ₹2,000 - ₹15,000
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-semibold mb-2">Ready to Get Started?</h4>
                    <p className="text-gray-600 mb-6">
                      Choose Razorpay for secure, instant payment processing with all major Indian payment methods.
                    </p>
                  </div>
                  
                  <a href="https://rzp.io/rzp/7uCrzBX" target="_blank" rel="noopener noreferrer" className="block w-full">
                    <button className="w-full bg-[#2d84fb] hover:bg-[#1a73e8] text-white font-medium py-4 px-4 rounded-lg transition-all flex items-center justify-center mb-4">
                      <img src="https://i.imgur.com/3g7nmJC.png" alt="Razorpay" className="h-6 mr-2" />
                      Pay with Razorpay
                    </button>
                  </a>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>UPI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>Credit/Debit Cards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>NetBanking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>Secure Payments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* International Customers Section */}
      <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#0055AA]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 text-white">
              <h2 className="text-3xl font-bold mb-6 font-poppins">
                For International Customers
              </h2>
              <p className="text-lg max-w-3xl mx-auto">
                We're bringing our expertise to businesses worldwide. Get the same great service with convenient international payment options.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-white/20">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Global Startup Package</h3>
                  <p className="text-gray-600 mb-6">
                    The same comprehensive digital package, perfectly adapted for international businesses looking to establish or expand their online presence with professional branding and marketing support.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Custom Branding Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Responsive Website (up to 5 pages)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">SEO Optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Social Media Setup & Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Lead Generation Blueprint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">Quick onboarding within 24 hours</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                    <p className="font-medium text-blue-800">
                      One-time payment of $175 USD
                    </p>
                    <p className="text-sm text-blue-600">
                      Secure international payment via PayPal
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-8 flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-semibold mb-2">Ready to Get Started?</h4>
                    <p className="text-gray-600 mb-6">
                      Choose PayPal for secure, convenient payments from anywhere in the world.
                    </p>
                  </div>
                  
                  {/* PayPal button container - ONLY place it appears on the page */}
                  <div className="mb-6">
                    <div id="paypal-container-4AT8YJ6R8MDPC"></div>
                    {/* Fallback if PayPal button doesn't load */}
                    <noscript>
                      <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4AT8YJ6R8MDPC" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" alt="Buy Now" />
                      </a>
                    </noscript>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>Credit Cards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>Debit Cards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>No PayPal account needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 h-4 w-4 flex-shrink-0" />
                      <span>Secure Transactions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 font-poppins text-gray-800">Need a Different Payment Option?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact us to discuss alternative payment methods, installment plans, or custom packages tailored to your specific needs.
            </p>
            <a href="/#contact">
              <Button className="bg-[#0066CC] hover:bg-[#0055AA] py-6 px-8 text-lg">
                Contact Us
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