import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Target, ArrowRight, CheckCircle2, Users, Heart, MonitorSmartphone, Share2, DollarSign } from "lucide-react";
import { Link } from "wouter";

export default function TheHelpingHandCaseStudy() {
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
                  Case Study • Non-Profit
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  How The Helping Hand Increased Donations by <span className="text-[#FF6B00]">150%</span>
                </h1>
                <p className="text-xl mb-8 text-gray-700">
                  A digital transformation that helped a local NGO expand their reach, increase donations, and attract more volunteers.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <div className="bg-white p-4 rounded-full border border-gray-100 shadow-sm">
                  <div className="bg-[#FF6B00]/10 p-6 rounded-full">
                    <Target className="w-16 h-16 text-[#FF6B00]" />
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
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">150%</div>
                <div className="text-gray-600">Donation Increase</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">200%</div>
                <div className="text-gray-600">Volunteer Growth</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-[#FF6B00] mb-2">6</div>
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
                  The Helping Hand is a Bihar-based NGO focused on education for underprivileged children and vocational training for women. Despite their incredible work over 8 years, they struggled with limited visibility, inconsistent donations, and challenges in volunteer recruitment.
                </p>
                <p className="text-gray-700 mb-6">
                  Before partnering with Synergy Brand Architect, The Helping Hand had minimal digital presence with only a basic Facebook page that was infrequently updated. They relied primarily on word-of-mouth and occasional local newspaper coverage for publicity.
                </p>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Key Challenges</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>No website or consistent digital presence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Inconsistent donation streams affecting program planning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Difficulty attracting volunteers beyond immediate network</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Limited ability to showcase impact and success stories</span>
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
                  We developed a comprehensive digital strategy focused on building The Helping Hand's online presence, showcasing their impact, and creating clear pathways for donations and volunteer engagement.
                </p>
                
                <div className="space-y-8 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <MonitorSmartphone className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Responsive Website Development</h3>
                        <p className="text-gray-700">
                          Created a professionally designed, mobile-responsive website with impact stories, donation pathways, and volunteer application forms.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Heart className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Impact Storytelling</h3>
                        <p className="text-gray-700">
                          Developed a content strategy focusing on beneficiary success stories, volunteer experiences, and transparent impact reporting.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <DollarSign className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Digital Donation System</h3>
                        <p className="text-gray-700">
                          Implemented easy-to-use online donation pathways with multiple payment options and automatic receipting.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#0066CC]/10 p-2 rounded-full mt-1">
                        <Share2 className="text-[#0066CC] w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0066CC] mb-2">Social Media Presence</h3>
                        <p className="text-gray-700">
                          Established consistent presence across Facebook, Instagram, and LinkedIn with regular updates and campaign-specific content.
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
                  Within 6 months of implementing our digital transformation strategy, The Helping Hand saw significant improvements in visibility, donations, and volunteer engagement.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">150%</div>
                    <div className="text-gray-700 font-medium mb-1">Donation Increase</div>
                    <p className="text-sm text-gray-600">Monthly donations rose from ₹45,000 to ₹112,500</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">200%</div>
                    <div className="text-gray-700 font-medium mb-1">Volunteer Applications</div>
                    <p className="text-sm text-gray-600">From 5-10 monthly to 15-30 qualified applicants</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">3,500+</div>
                    <div className="text-gray-700 font-medium mb-1">Social Media Followers</div>
                    <p className="text-sm text-gray-600">Across Facebook, Instagram, and LinkedIn</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="text-3xl font-bold text-[#FF6B00] mb-2">35</div>
                    <div className="text-gray-700 font-medium mb-1">Corporate Partners</div>
                    <p className="text-sm text-gray-600">Including 12 new CSR partnerships</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
                  <h3 className="font-semibold mb-4 text-[#0066CC]">Additional Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Recognition by two national-level NGO awards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Featured in regional and national media outlets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Expanded programs to two new districts in Bihar</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#FF6B00] h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span>Developed a recurring donor program with 65+ monthly supporters</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#0066CC]/5 p-6 rounded-xl border border-[#0066CC]/10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-[#0066CC]">"</div>
                    <div>
                      <p className="text-gray-700 italic mb-4">
                        Our partnership with Synergy Brand Architect was truly transformative. Having a professional digital presence has completely changed how we connect with donors and volunteers. The increase in donations has allowed us to expand our programs and help more children than ever before.
                      </p>
                      <p className="font-medium">Priya Sharma</p>
                      <p className="text-sm text-gray-600">Founder, The Helping Hand</p>
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
            <h2 className="text-3xl font-bold mb-6">Ready to Amplify Your Non-Profit's Impact?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a customized digital strategy designed to increase donations and volunteer engagement
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