import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { BarChart4, ArrowRight, CheckCircle2, Users, Camera, Target, LayoutGrid, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function BiryaniMahalCaseStudy() {
  return (
    <div className="flex flex-col min-h-screen font-inter text-[#333333] bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#FF6B00]/5 to-[#0066CC]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="md:w-2/3">
                <div className="px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-sm font-medium inline-block mb-4">
                  Case Study • Restaurant
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  How Biryani Mahal Increased Online Orders by <span className="text-[#FF6B00]">200%</span>
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  A brand transformation and social media strategy that helped a local restaurant compete with national chains.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <div className="bg-white p-4 rounded-full border border-gray-100 shadow-sm">
                  <div className="bg-[#FF6B00]/10 p-6 rounded-full">
                    <BarChart4 className="w-16 h-16 text-[#FF6B00]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">300%</div>
                <div className="text-gray-600">Social Media Growth</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">200%</div>
                <div className="text-gray-600">Online Order Increase</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">3</div>
                <div className="text-gray-600">Months Campaign Duration</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Client Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-[#0066CC]">About the Client</h2>
                <div className="w-16 h-1 bg-[#FF6B00] mb-6"></div>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 mb-6">
                  Biryani Mahal is a family-owned restaurant in Patna specializing in authentic Biryani and North Indian cuisine. Despite having excellent food quality and loyal customers, they struggled to compete with larger restaurant chains and food delivery platforms.
                </p>
                <p className="text-gray-700 mb-6">
                  Before partnering with Synergy Brand Architect, Biryani Mahal had minimal online presence with an outdated menu on food aggregator platforms and a basic social media account with infrequent, low-quality posts. They were losing potential customers to more visible competitors.
                </p>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Key Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Limited brand presence in a competitive market</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Poor visibility on food delivery platforms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Inconsistent social media presence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>No system for encouraging repeat orders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-[#0066CC]">Our Approach</h2>
                <div className="w-16 h-1 bg-[#FF6B00] mb-6"></div>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 mb-6">
                  We developed a comprehensive brand identity and social media strategy focused on showcasing Biryani Mahal's authentic cuisine and creating a distinctive brand in the local food scene.
                </p>
                
                <div className="space-y-8 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <LayoutGrid className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Brand Identity Refresh</h3>
                        <p className="text-gray-700">
                          Developed a cohesive brand identity including logo refinement, color palette, typography, and visual style that reflected the restaurant's heritage and quality.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Camera className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Food Photography</h3>
                        <p className="text-gray-700">
                          Conducted professional food photography sessions to showcase their signature dishes in the most appetizing way for use across digital platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <MessageCircle className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Social Media Strategy</h3>
                        <p className="text-gray-700">
                          Created a content calendar with consistent posting schedule featuring food highlights, behind-the-scenes content, chef stories, and customer testimonials.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Target className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Localized Promotions</h3>
                        <p className="text-gray-700">
                          Implemented targeted social media advertising to reach potential customers within a 5km radius of the restaurant, with special focus on meal times.
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
      
      {/* Results */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4 text-[#0066CC]">Results</h2>
                <div className="w-16 h-1 bg-[#FF6B00] mb-6"></div>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 mb-8">
                  Within 3 months of implementing our brand identity and social media strategy, Biryani Mahal saw significant improvements in their online presence and business performance.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">300%</div>
                    <div className="text-gray-700 font-medium mb-1">Social Media Growth</div>
                    <p className="text-sm text-gray-600">Increased Instagram followers from 600 to 2,400</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">200%</div>
                    <div className="text-gray-700 font-medium mb-1">Online Order Increase</div>
                    <p className="text-sm text-gray-600">Monthly online orders grew from ~150 to ~450</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">65%</div>
                    <div className="text-gray-700 font-medium mb-1">Engagement Rate</div>
                    <p className="text-sm text-gray-600">Average engagement on social media posts</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">4.8/5</div>
                    <div className="text-gray-700 font-medium mb-1">Online Rating</div>
                    <p className="text-sm text-gray-600">Improved from 4.2 across food delivery platforms</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Additional Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Increased brand recognition in the local food scene</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Improved in-store foot traffic by approximately 35%</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Featured in local food media as "Patna's Hidden Gem"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Built a database of 1,200+ repeat customers</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#0066CC]/5 p-6 rounded-xl border border-[#0066CC]/10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-[#0066CC]">"</div>
                    <div>
                      <p className="text-gray-700 italic mb-4">
                        Synergy Brand Architect completely transformed our restaurant's digital presence. Our social media now truly showcases our food's quality, and the increase in online orders has been incredible. We're now competing with much larger restaurants in the area.
                      </p>
                      <p className="font-medium">Mohammed Imran</p>
                      <p className="text-sm text-gray-600">Owner, Biryani Mahal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#004999]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Restaurant's Digital Presence?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a customized social media and branding strategy designed for your restaurant
            </p>
            <div>
              <a href="/#contact">
                <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-6 px-8 rounded-lg transition-all hover:shadow-lg text-lg">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}