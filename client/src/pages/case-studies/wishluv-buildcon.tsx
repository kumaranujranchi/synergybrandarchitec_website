import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, CheckCircle2, Users, Calendar, Target, BarChart, Phone } from "lucide-react";
import { Link } from "wouter";

export default function WishluvBuildconCaseStudy() {
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
                  Case Study • Real Estate
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  How Wishluv Buildcon Generated <span className="text-[#FF6B00]">120+ Leads</span> in 45 Days
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  A digital transformation journey for a Patna-based real estate developer to reach new customers in a competitive market.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <div className="bg-white p-4 rounded-full border border-gray-100 shadow-sm">
                  <div className="bg-[#FF6B00]/10 p-6 rounded-full">
                    <Trophy className="w-16 h-16 text-[#FF6B00]" />
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
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">120+</div>
                <div className="text-gray-600">Qualified Leads</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">430%</div>
                <div className="text-gray-600">Marketing ROI</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">45</div>
                <div className="text-gray-600">Days Campaign Duration</div>
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
                  Wishluv Buildcon is a real estate developer based in Patna, Bihar, specializing in residential projects. With over 5 years in the market, they faced challenges in reaching new customers and generating qualified leads in an increasingly competitive market.
                </p>
                <p className="text-gray-700 mb-6">
                  Before partnering with Synergy Brand Architect, Wishluv Buildcon relied primarily on traditional marketing methods like newspaper ads, physical banners, and word-of-mouth. Their digital presence was minimal, with an outdated website and no systematic approach to digital marketing.
                </p>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Key Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Limited digital presence with outdated website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>No systematic approach to lead generation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Difficulty measuring marketing ROI from traditional channels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Limited understanding of digital marketing strategies</span>
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
                  We developed a comprehensive digital marketing strategy focused on generating high-quality leads for their latest residential project. Our approach combined website redesign, targeted advertising, and a systematic lead nurturing process.
                </p>
                
                <div className="space-y-8 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Users className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Target Audience Analysis</h3>
                        <p className="text-gray-700">
                          We conducted in-depth research to identify key buyer personas for the residential project, including demographic profiles, pain points, and decision-making factors.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <BarChart className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Digital Presence Overhaul</h3>
                        <p className="text-gray-700">
                          Redesigned their website with property-specific landing pages optimized for conversions, improved visual presentation, and mobile responsiveness.
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
                        <h3 className="font-semibold text-[#0066CC] mb-2">Targeted Advertising Campaign</h3>
                        <p className="text-gray-700">
                          Implemented Facebook and Google Ads campaigns with hyper-local targeting focused on potential homebuyers in Patna and surrounding areas.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Phone className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Lead Qualification System</h3>
                        <p className="text-gray-700">
                          Established a lead scoring and follow-up system to ensure the sales team focused on the most qualified prospects.
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
                  Within 45 days of implementing our digital strategy, Wishluv Buildcon saw transformational results in their lead generation efforts and overall business performance.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">120+</div>
                    <div className="text-gray-700 font-medium mb-1">Qualified Leads Generated</div>
                    <p className="text-sm text-gray-600">From targeted digital campaigns within the first 45 days</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">42%</div>
                    <div className="text-gray-700 font-medium mb-1">Lead-to-Appointment Ratio</div>
                    <p className="text-sm text-gray-600">Compared to previous 10% with traditional methods</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">8</div>
                    <div className="text-gray-700 font-medium mb-1">Property Bookings</div>
                    <p className="text-sm text-gray-600">Direct result from digital marketing efforts</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">430%</div>
                    <div className="text-gray-700 font-medium mb-1">Return on Ad Spend</div>
                    <p className="text-sm text-gray-600">Calculated from confirmed property bookings</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Additional Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Increased brand visibility in the Patna real estate market</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Improved sales team efficiency through lead qualification system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Better understanding of customer preferences and objections</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Established digital marketing framework for future projects</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#0066CC]/5 p-6 rounded-xl border border-[#0066CC]/10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-[#0066CC]">"</div>
                    <div>
                      <p className="text-gray-700 italic mb-4">
                        Synergy Brand Architect transformed our approach to marketing. The results exceeded our expectations with over 120 quality leads and 8 property bookings in just 45 days. Their strategic approach gave us a sustainable digital framework that continues to deliver results.
                      </p>
                      <p className="font-medium">Rajesh Kumar</p>
                      <p className="text-sm text-gray-600">Marketing Director, Wishluv Buildcon</p>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Lead Generation?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a customized digital marketing strategy designed for your business goals
            </p>
            <div>
              <Link href="/contact">
                <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-6 px-8 rounded-lg transition-all hover:shadow-lg text-lg">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}