import { ArrowRight, Ban, CheckCircle, LucideDollarSign, ShieldCheck, LayoutGrid, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdAccountAccess() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-[#FF6B00]/10 px-4 py-1 rounded-full inline-block mb-6">
                <span className="text-[#FF6B00] font-medium text-sm">Agency Ad Account Access</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] font-poppins">
                Tired of Ad Account Bans? We've Got You Covered!
              </h2>
              <h3 className="text-xl md:text-2xl font-medium mb-6 text-[#0066CC]">
                No Ban. No Limits. Just Results.
              </h3>
              <p className="text-lg text-gray-700 mb-8">
                If your Meta or Google ad account got banned or has low spending limits, don't worry – we've got the ultimate solution. 
                Run your ads via our trusted agency accounts and focus only on what matters: sales and growth.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="bg-[#FF6B00]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <MousePointer className="text-[#FF6B00] h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Run Ads From Day 1</h4>
                  <p className="text-gray-600">No need to wait — start scaling immediately.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="bg-[#0066CC]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <LucideDollarSign className="text-[#0066CC] h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">No Spend Limits</h4>
                  <p className="text-gray-600">Enjoy high daily ad budgets from the beginning.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="bg-[#FF6B00]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <ShieldCheck className="text-[#FF6B00] h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">No Ban Worries</h4>
                  <p className="text-gray-600">We manage ad compliance for you — no fear of sudden bans.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="bg-[#0066CC]/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    <LayoutGrid className="text-[#0066CC] h-5 w-5" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Meta & Google Both Covered</h4>
                  <p className="text-gray-600">Use our agency ad accounts across both major platforms.</p>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold mb-6">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
                  <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center absolute -top-3 -left-3">
                    1
                  </div>
                  <h5 className="font-semibold text-lg mb-2">Contact Us</h5>
                  <p className="text-gray-600">
                    Tell us your ad goals and business type.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
                  <div className="bg-[#0066CC] text-white rounded-full w-8 h-8 flex items-center justify-center absolute -top-3 -left-3">
                    2
                  </div>
                  <h5 className="font-semibold text-lg mb-2">We Assign Account Access</h5>
                  <p className="text-gray-600">
                    Use our verified ad accounts for Meta or Google.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
                  <div className="bg-[#FF6B00] text-white rounded-full w-8 h-8 flex items-center justify-center absolute -top-3 -left-3">
                    3
                  </div>
                  <h5 className="font-semibold text-lg mb-2">You Launch & Grow</h5>
                  <p className="text-gray-600">
                    Focus on results while we handle the backend.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#0066CC] to-[#0055AA] rounded-xl p-6 text-white">
                <h4 className="text-xl font-semibold mb-4">Don't Let Bans Stop Your Growth!</h4>
                <p className="mb-6">Get in touch today and let your ads run non-stop — no bans, no limits, no stress.</p>
                <a href="#contact">
                  <Button className="bg-[#FF6B00] hover:bg-[#FF8533] py-5 px-6 text-white font-medium rounded-lg w-full">
                    Get Access Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <div className="flex flex-wrap items-center justify-center mt-4 text-sm gap-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>100% Safe</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Quick Approval</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Real Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column: Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Main Image */}
              <div className="mb-8 relative">
                <img 
                  src="https://imagizer.imageshack.com/img924/7219/B4nN70.jpg" 
                  alt="Ad Account Access Services" 
                  className="rounded-xl shadow-lg w-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#FF6B00] text-white px-4 py-2 rounded-lg font-medium shadow-md">
                  Trusted by 100+ Advertisers
                </div>
              </div>
              
              <div className="relative">
                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 mx-auto w-16 h-16 flex items-center justify-center">
                      <Ban className="h-10 w-10 text-red-500" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-red-600">Without Us</h4>
                    <ul className="text-left text-sm space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Ad account bans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Low spending limits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Ad disapprovals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Wasted time & money</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">✕</span>
                        <span>Limited targeting</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* After */}
                  <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 mx-auto w-16 h-16 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-green-600">With Our Solution</h4>
                    <ul className="text-left text-sm space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Immediate ad launch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Unlimited daily spend</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Smooth approval process</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Focus on ROI & results</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">✓</span>
                        <span>Full targeting options</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Active Platforms Showcase */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-10">
                  <h3 className="text-lg font-semibold mb-6 text-center">Supported Ad Platforms</h3>
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="border border-gray-100 rounded-lg p-5 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <svg className="w-10 h-10" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M36 18C36 8.059 27.941 0 18 0C8.059 0 0 8.059 0 18C0 26.99 6.582 34.479 15.188 35.809V23.344H10.723V18H15.188V14.062C15.188 9.615 17.775 7.172 21.823 7.172C23.76 7.172 25.719 7.5 25.719 7.5V11.719H23.531C21.375 11.719 20.625 13.078 20.625 14.469V18H25.488L24.668 23.344H20.625V35.809C29.231 34.479 36 26.99 36 18Z" fill="#1877F2"/>
                          <path d="M24.668 23.344L25.488 18H20.625V14.469C20.625 13.078 21.375 11.719 23.531 11.719H25.719V7.5C25.719 7.5 23.76 7.172 21.823 7.172C17.775 7.172 15.188 9.615 15.188 14.062V18H10.723V23.344H15.188V35.809C16.104 35.931 17.055 36 18 36C18.945 36 19.896 35.931 20.812 35.809V23.344H24.668Z" fill="white"/>
                        </svg>
                      </div>
                      <p className="font-semibold text-base">Meta Ads</p>
                      <p className="text-sm text-green-600 mt-2 font-medium flex items-center justify-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Active
                      </p>
                    </div>
                    
                    <div className="border border-gray-100 rounded-lg p-5 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <svg className="w-10 h-10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M113.47 309.408L95.648 375.94L30.059 377.318C10.9096 341.211 0 299.9 0 256C0 213.549 10.1392 173.517 27.9921 138.354H28.0072L86.0288 148.932L111.419 204.074C106.113 220.047 103.226 237.56 103.226 256C103.226 276.087 106.758 295.081 113.47 309.408Z" fill="#FBBB00"/>
                          <path d="M507.527 208.176C510.467 223.662 512 239.656 512 256C512 274.328 510.073 292.119 506.402 309.08C495.579 362.387 468.319 409.575 430.24 445.215L430.225 445.2L356.596 440.793L346.03 376.894C376.818 359.637 400.116 332.344 412.069 309.08H270.923V208.176H413.417H507.527Z" fill="#518EF8"/>
                          <path d="M430.225 445.201L430.24 445.216C393.161 479.94 345.256 502.89 291.982 508.848C237.111 514.976 183.694 503.722 138.858 477.827C106.024 459.172 78.856 431.933 60.254 399.075L143.858 330.654C153.824 359.866 175.152 383.961 203.109 397.67C231.923 411.77 266.208 415.43 297.954 407.506C320.616 401.847 340.925 389.932 356.596 373.217" fill="#28B446"/>
                          <path d="M440.691 67.7718C440.957 68.1325 441.219 68.4956 441.48 68.8587C404.781 33.4369 356.58 9.93243 302.915 3.44646C248.831 -3.11107 195.038 8.08239 149.897 34.0457C118.797 52.0324 93.004 77.9602 75.1254 109.206L156.164 175.191C166.274 147.099 186.784 124.326 213.357 111.232C250.635 93.2958 295.694 92.6255 333.462 109.391C355.737 119.44 374.712 135.297 388.44 155.028L440.691 67.7718Z" fill="#F14336"/>
                        </svg>
                      </div>
                      <p className="font-semibold text-base">Google Ads</p>
                      <p className="text-sm text-green-600 mt-2 font-medium flex items-center justify-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Active
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 pb-2 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">Fully compliant with platform policies</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}