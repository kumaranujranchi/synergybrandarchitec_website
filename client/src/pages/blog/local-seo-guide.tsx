import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { useEffect } from "react";
import { Calendar, User, MapPin, Share2 } from 'lucide-react';
import { useLocation } from "wouter";

export default function LocalSEOGuide() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0066CC] to-[#004999] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                SEO
              </span>
              <span className="text-white/80 text-sm">7 min read</span>
            </div>
            
            <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-6">
              The Ultimate Guide to Local SEO for Patna Businesses
            </h1>
            
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Synergy Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>January 18, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop"
              alt="Local SEO Guide"
              className="w-full h-[400px] object-cover rounded-lg mb-12"
            />

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333]">
                Introduction
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For businesses in Patna, standing out in local search results is crucial for attracting customers in your neighborhood. Whether you run a restaurant, retail store, or service business, local SEO helps you appear when potential customers search for products or services "near me" or in Patna.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                1. Optimize Your Google Business Profile
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Your Google Business Profile (formerly Google My Business) is the cornerstone of local SEO. Make sure your profile is complete with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Accurate business name, address, and phone number (NAP)</li>
                <li>Business hours, including special hours for holidays</li>
                <li>High-quality photos of your business, products, and team</li>
                <li>Business category and attributes</li>
                <li>Regular posts and updates</li>
              </ul>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                2. Build Local Citations
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Citations are online mentions of your business name, address, and phone number on other websites. Focus on:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Local business directories (Justdial, Sulekha, IndiaMART)</li>
                <li>Industry-specific directories</li>
                <li>Chamber of Commerce listings</li>
                <li>Local news websites and blogs</li>
              </ul>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                3. Collect and Respond to Customer Reviews
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Reviews are a major ranking factor for local SEO and influence customer decisions. Encourage satisfied customers to leave reviews on Google, and always respond professionally to both positive and negative feedback.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                4. Create Location-Specific Content
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Develop content that speaks directly to your Patna audience:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Blog posts about local events and news</li>
                <li>Guides to Patna neighborhoods</li>
                <li>Case studies featuring local clients</li>
                <li>Pages targeting local keywords (e.g., "best restaurant in Boring Road Patna")</li>
              </ul>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                5. Optimize for Mobile
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Most local searches happen on mobile devices. Ensure your website is mobile-friendly with fast loading times, easy navigation, and click-to-call buttons. Use Google's Mobile-Friendly Test to check your site's performance.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                6. Use Local Schema Markup
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Schema markup helps search engines understand your business information better. Implement LocalBusiness schema to provide structured data about your business, including location, hours, and contact information.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                Conclusion
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Local SEO is an ongoing process that requires consistent effort and attention. By optimizing your Google Business Profile, building citations, collecting reviews, creating local content, ensuring mobile-friendliness, and implementing schema markup, you'll significantly improve your visibility in Patna's local search results and attract more customers to your business.
              </p>
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600 font-semibold">Share this article</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-lg p-8 mt-12 text-white">
              <h3 className="font-poppins font-bold text-2xl mb-4">
                Need Help With Local SEO in Patna?
              </h3>
              <p className="mb-6 opacity-95">
                Our team specializes in helping Patna businesses dominate local search results.
              </p>
              <button
                onClick={() => setLocation("/contact")}
                className="bg-white text-[#FF6B35] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Get a Free Consultation
              </button>
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="font-poppins font-semibold text-2xl mb-8 text-[#333333]">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setLocation("/blog/digital-marketing-trends")}
                  className="text-left p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#0066CC] mb-2">
                    5 Digital Marketing Trends to Watch in 2023
                  </h4>
                  <p className="text-sm text-gray-600">Stay ahead of the curve</p>
                </button>
                
                <button
                  onClick={() => setLocation("/blog/building-brand-resonance")}
                  className="text-left p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#0066CC] mb-2">
                    How to Build a Brand That Resonates With Your Audience
                  </h4>
                  <p className="text-sm text-gray-600">Create emotional connections</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <WhatsappButton />
      <Footer />
    </div>
  );
}
