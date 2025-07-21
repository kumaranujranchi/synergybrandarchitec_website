import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link, useLocation, useSearch } from "wouter";

interface ServiceItem {
  title: string;
  description: string;
}

const brandSolutions: ServiceItem[] = [
  {
    title: "Brand Strategy / Positioning",
    description: "This is the foundation of your entire brand identity. We help you determine how your brand should be perceived in the minds of your target customers. This includes identifying your brand's core purpose, values, unique strengths, and the emotional connection it should build with customers. Through competitive analysis and audience research, we help position your brand in a unique, memorable space in the market."
  },
  {
    title: "Brand Identity Development",
    description: "Your visual identity is often your brand's first impression. We help build a cohesive brand identity including logo design, typography, color palette, brand tone, and style guidelines. Our goal is to ensure that every visual and written element consistently communicates your brand personality and values across all platforms."
  },
  {
    title: "Corporate Communications",
    description: "Effective communication is vital to maintaining internal harmony and public trust. We create structured messaging for both internal (employees, stakeholders) and external (customers, media, public) audiences. This includes speeches, newsletters, company profiles, investor reports, and media communication."
  },
  {
    title: "Brand Refresh / Rebranding",
    description: "Whether you're pivoting in a new direction or revamping a tired image, we assist with brand overhauls. Our rebranding services include strategic review, identity redesign, messaging realignment, and rollout planning to help you transition seamlessly while retaining brand equity."
  },
  {
    title: "Brand Communication & Design",
    description: "We create compelling visual and written materials that tell your brand's story and promote your services. This includes brochures, banners, packaging, ads, pitch decks, and more. We ensure that all brand touchpoints carry a consistent message that resonates with your audience."
  },
  {
    title: "Content Development Services",
    description: "From articles and ad copies to email content and web pages—we create content that aligns with your brand voice and drives action. Whether you're looking for storytelling, informational content, or conversion-driven copy, our writers deliver quality content optimized for audience engagement and SEO."
  },
  {
    title: "Brand Experience Design",
    description: "We design interactive and immersive experiences that leave a lasting impression. This could be digital (web experiences, app UX/UI) or physical (events, store layouts). Our aim is to make every interaction with your brand a memorable one."
  },
  {
    title: "Photoshoots & Video Shoots",
    description: "Professional-grade visuals are critical for brand authenticity. We handle end-to-end execution of corporate shoots, product photography, event coverage, brand documentaries, reels, and promo videos. Each project is styled and directed to reflect your brand aesthetics."
  },
  {
    title: "Brand Conformance (IPR)",
    description: "Your brand's uniqueness needs legal protection. We assist with Intellectual Property Rights (IPR) such as trademark filing, copyright registration, and legal consultations to ensure your brand assets are safe from infringement and misuse."
  },
  {
    title: "Brand Voice & Messaging Framework",
    description: "Your brand's tone and messaging need to be consistent across all channels. We develop comprehensive guidelines for how your brand speaks, the language it uses, and the key messages it communicates. This framework ensures that everyone from marketing to customer service represents your brand consistently."
  }
];

const digitalMarketingSolutions: ServiceItem[] = [
  {
    title: "Website & Mobile App Development",
    description: "Your website and app are your 24/7 brand representatives. We design and develop responsive, SEO-friendly websites and apps that offer seamless user experience. Whether it's an informational site, e-commerce platform, or custom mobile app, we ensure it aligns with your branding and business goals."
  },
  {
    title: "Social Media Marketing",
    description: "Social media is where conversations happen. We manage and grow your presence across platforms like Facebook, Instagram, LinkedIn, and Twitter through content creation, posting schedules, ad campaigns, community management, and analytics to drive engagement and lead generation."
  },
  {
    title: "Search Engine Optimisation (SEO)",
    description: "We help your website rank higher on search engines by optimizing on-page elements, building backlinks, targeting relevant keywords, and fixing technical issues. The goal is to increase organic traffic and visibility so that your customers can find you easily online."
  },
  {
    title: "Content Marketing",
    description: "We create informative and valuable content to attract, engage, and convert your target audience. This includes articles, ebooks, whitepapers, case studies, videos, infographics, and more. Content marketing helps in lead generation, SEO, and building brand authority."
  },
  {
    title: "Performance Marketing",
    description: "This is ROI-driven advertising. We create and manage ad campaigns on Google, Meta (Facebook/Instagram), YouTube, and more to generate measurable results—clicks, leads, conversions, and sales. Our strategies are data-backed, optimized for budget, and tailored to your audience."
  },
  {
    title: "WhatsApp Marketing",
    description: "With over 2 billion users globally, WhatsApp is a powerful direct communication tool. We design and execute campaigns including promotions, updates, and customer service messages that are personalized, timely, and interactive—while complying with platform rules."
  },
  {
    title: "Community / Influencer Marketing",
    description: "We connect your brand with influential voices in your industry or niche to build credibility and trust. From nano to mega influencers, we handle collaboration planning, content briefing, campaign tracking, and performance reporting to ensure ROI."
  },
  {
    title: "Video Marketing",
    description: "We plan, script, shoot, and distribute high-quality videos including ads, explainers, testimonials, tutorials, and reels. Videos are an essential part of storytelling and significantly boost engagement and conversion across platforms."
  },
  {
    title: "Email Marketing",
    description: "Email remains one of the highest ROI marketing channels. We design automated and personalized campaigns for lead nurturing, promotions, onboarding, retention, and reactivation. Our strategies ensure high open rates and conversions with clean, mobile-friendly design and compelling CTAs."
  },
  {
    title: "Online Reputation Management (ORM)",
    description: "Your online image can make or break your business. We monitor and manage your brand mentions, reviews, and ratings across platforms. We handle negative feedback professionally, promote positive sentiment, and ensure your brand's credibility stays intact."
  },
  {
    title: "Marketing Automation",
    description: "Save time and improve efficiency with automated workflows for lead generation, email sequences, sales follow-ups, and customer onboarding. We implement tools like HubSpot, Mailchimp, and others to streamline your marketing activities and improve ROI."
  },
  {
    title: "Conversion Rate Optimization (CRO)",
    description: "We transform your website visitors into paying customers by analyzing user behavior, identifying drop-off points, and optimizing landing pages, forms, and checkout processes. Through A/B testing and data-driven insights, we improve conversion rates and maximize your marketing ROI."
  }
];

export default function ServicesPage() {
  // Parse URL query parameter to get the selected tab
  const search = useSearch();
  const params = new URLSearchParams(search);
  const tabFromUrl = params.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl === 'digital' ? 'digital' : 'brand');
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Services | Synergy Brand Architect";
    
    // If tab is specified in URL, set it as active
    if (tabFromUrl) {
      setActiveTab(tabFromUrl === 'digital' ? 'digital' : 'brand');
    }
  }, [tabFromUrl]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setLocation(`/services?tab=${value}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
              Our Comprehensive <span className="text-[#FF6B00]">Services</span>
            </h1>
            <p className="text-lg text-gray-600 font-inter">
              Synergy Brand Architect offers a wide range of strategic marketing and branding solutions 
              to help businesses build their identity, reach their target audience, and achieve their goals.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-5xl mx-auto">
            <TabsList className="w-full flex mb-8 bg-transparent border-b border-gray-200">
              <TabsTrigger 
                value="brand" 
                className="flex-1 py-3 px-5 text-lg font-semibold data-[state=active]:text-[#FF6B00] data-[state=active]:border-b-2 
                data-[state=active]:border-[#FF6B00] rounded-none"
              >
                Brand Solutions
              </TabsTrigger>
              <TabsTrigger 
                value="digital" 
                className="flex-1 py-3 px-5 text-lg font-semibold data-[state=active]:text-[#0066CC] data-[state=active]:border-b-2 
                data-[state=active]:border-[#0066CC] rounded-none"
              >
                Digital Marketing Solutions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="brand" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {brandSolutions.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-poppins font-semibold text-[#FF6B00] mb-3 flex items-center">
                        <CheckCircle size={20} className="mr-2 text-[#FF6B00]" />
                        {service.title}
                      </h3>
                      <p className="text-gray-600 font-inter mb-4">
                        {service.description}
                      </p>
                      <div className="mt-auto pt-3">
                        <Link href="/#contact" className="inline-flex items-center text-[#FF6B00] font-semibold hover:text-[#FF8533]">
                          Get Started <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="digital" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {digitalMarketingSolutions.map((service, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                    <div className="flex flex-col">
                      <h3 className="text-xl font-poppins font-semibold text-[#0066CC] mb-3 flex items-center">
                        <CheckCircle size={20} className="mr-2 text-[#0066CC]" />
                        {service.title}
                      </h3>
                      <p className="text-gray-600 font-inter mb-4">
                        {service.description}
                      </p>
                      <div className="mt-auto pt-3">
                        <Link href="/#contact" className="inline-flex items-center text-[#0066CC] font-semibold hover:text-[#0077EE]">
                          Get Started <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-16">
            <Link href="/#contact" className="inline-flex items-center justify-center px-6 py-3 font-inter font-semibold rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white hover:from-[#FF5500] hover:to-[#FF7722] transition-colors">
              Contact Us for Custom Solutions
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}