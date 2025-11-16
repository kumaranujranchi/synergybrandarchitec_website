import { useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Building2, Utensils, ShoppingBag, ArrowRight, Target, TrendingUp, Users } from 'lucide-react';
import { Link } from 'wouter';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  description: string;
  image: string;
  icon: any;
  iconBg: string;
  results: string[];
  link: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "wishluv-buildcon",
    title: "How Wishluv Buildcon Generated 120+ Leads in 45 Days",
    company: "Wishluv Buildcon",
    industry: "Real Estate",
    description: "A digital transformation journey for a Patna-based real estate developer to reach new customers in a competitive market. We helped them transition from traditional marketing to a comprehensive digital strategy.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
    icon: Building2,
    iconBg: "bg-[#0066CC]",
    results: ["120+ Qualified Leads", "430% Marketing ROI", "45 Days Campaign"],
    link: "/case-studies/wishluv-buildcon"
  },
  {
    id: "biryani-mahal",
    title: "From Street Style to Premium Dining – Brand Transformation",
    company: "Biryani Mahal",
    industry: "Restaurant & Food Services",
    description: "A complete brand makeover that transformed a local eatery into a premium dining destination. Increased footfall by 70% in just 45 days through strategic rebranding and digital marketing.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=500&fit=crop",
    icon: Utensils,
    iconBg: "bg-[#FF6B00]",
    results: ["70% Increase in Footfall", "Premium Brand Positioning", "45 Days Transformation"],
    link: "/case-studies/biryani-mahal"
  },
  {
    id: "the-helping-hand",
    title: "Helping a Local Business Go Global – 200% Revenue Growth",
    company: "The Helping Hand",
    industry: "E-commerce & Handicrafts",
    description: "Building a complete e-commerce system from scratch that helped a local handcraft business reach customers across India. Achieved 200% revenue growth through digital transformation.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=500&fit=crop",
    icon: ShoppingBag,
    iconBg: "bg-[#0066CC]",
    results: ["200% Revenue Growth", "National Reach", "Complete E-commerce Setup"],
    link: "/case-studies/the-helping-hand"
  }
];

export default function CaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsappButton />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0066CC] to-[#004999] text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Success Stories
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Real businesses, real results. Discover how we've helped companies transform their digital presence and achieve remarkable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Lead Generation
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Brand Transformation
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Revenue Growth
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => {
                const IconComponent = study.icon;
                return (
                  <Link key={study.id} href={study.link}>
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                      {/* Case Study Image */}
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img 
                          src={study.image} 
                          alt={study.company}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#FF6B00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {study.industry}
                          </span>
                        </div>
                        <div className={`absolute top-4 right-4 ${study.iconBg} p-3 rounded-full shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Case Study Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        {/* Company Name */}
                        <div className="text-sm text-gray-500 mb-2 font-semibold">
                          {study.company}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0066CC] transition-colors">
                          {study.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {study.description}
                        </p>

                        {/* Results */}
                        <div className="space-y-2 mb-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full"></div>
                              <span className="text-gray-700 font-medium">{result}</span>
                            </div>
                          ))}
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-[#0066CC] font-semibold text-sm group-hover:gap-3 transition-all flex items-center gap-2">
                            Read Full Case Study
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Stats Section */}
            <div className="mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#004999] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="text-white" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-[#0066CC] mb-2">500+</div>
                  <div className="text-gray-600">Qualified Leads Generated</div>
                </div>
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF8533] rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-[#FF6B00] mb-2">300%</div>
                  <div className="text-gray-600">Average ROI Increase</div>
                </div>
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#004999] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-white" size={32} />
                  </div>
                  <div className="text-3xl font-bold text-[#0066CC] mb-2">50+</div>
                  <div className="text-gray-600">Happy Clients Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0066CC] to-[#004999] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's work together to transform your business with proven digital marketing strategies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/#contact" 
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2"
              >
                Get Your Free Consultation
                <ArrowRight size={20} />
              </a>
              <a 
                href="/services" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/30"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
