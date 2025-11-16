import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { useEffect } from "react";
import { Calendar, User, TrendingUp, Share2 } from 'lucide-react';
import { useLocation } from "wouter";

export default function BlogPost() {
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
                Digital Marketing
              </span>
              <span className="text-white/80 text-sm">5 min read</span>
            </div>
            
            <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-6">
              5 Digital Marketing Trends to Watch in 2023
            </h1>
            
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Synergy Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>January 15, 2025</span>
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
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop"
              alt="Digital Marketing Trends"
              className="w-full h-[400px] object-cover rounded-lg mb-12"
            />

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333]">
                Introduction
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The digital marketing space is transforming rapidly. From AI-powered personalization to voice search optimization, the landscape continues to evolve at an unprecedented pace. Businesses that stay ahead of these trends will have a significant competitive advantage in 2023 and beyond.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                1. AI-Powered Personalization
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Artificial intelligence is revolutionizing how businesses interact with customers. AI-driven personalization allows marketers to deliver highly targeted content, product recommendations, and experiences based on individual user behavior and preferences. This trend is becoming essential for businesses looking to stand out in crowded markets.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                2. Voice Search Optimization
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                With the rise of smart speakers and voice assistants, optimizing for voice search is no longer optional. Voice searches are typically longer and more conversational than text searches. Businesses need to adapt their SEO strategies to include natural language phrases and question-based keywords.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                3. Short-Form Video Content
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Platforms like Instagram Reels, YouTube Shorts, and TikTok have made short-form video content a dominant force in digital marketing. These bite-sized videos offer high engagement rates and are perfect for capturing attention in our fast-paced digital world. Brands that master this format will see significant returns.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                4. Privacy-First Marketing
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                With increasing concerns about data privacy and regulations like GDPR, marketers must adopt privacy-first strategies. This means being transparent about data collection, offering clear opt-in options, and finding creative ways to deliver personalized experiences without compromising user privacy.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                5. Interactive Content
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Interactive content such as quizzes, polls, calculators, and augmented reality experiences are gaining traction. These formats drive higher engagement rates compared to static content and provide valuable data about customer preferences and behavior.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                Conclusion
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Staying ahead in digital marketing requires continuous learning and adaptation. By embracing these trends—AI personalization, voice search, short-form video, privacy-first approaches, and interactive content—your business can build stronger connections with customers and achieve sustainable growth in the digital landscape.
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
                Ready to Transform Your Digital Marketing?
              </h3>
              <p className="mb-6 opacity-95">
                Let's discuss how we can help you implement these trends and grow your business.
              </p>
              <button
                onClick={() => setLocation("/contact")}
                className="bg-white text-[#FF6B35] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Get Started Today
              </button>
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="font-poppins font-semibold text-2xl mb-8 text-[#333333]">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setLocation("/blog/local-seo-guide-patna-businesses")}
                  className="text-left p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#0066CC] mb-2">
                    The Ultimate Guide to Local SEO for Patna Businesses
                  </h4>
                  <p className="text-sm text-gray-600">Learn how to dominate local search results</p>
                </button>
                
                <button
                  onClick={() => setLocation("/blog/building-brand-resonance")}
                  className="text-left p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#0066CC] mb-2">
                    How to Build a Brand That Resonates With Your Audience
                  </h4>
                  <p className="text-sm text-gray-600">Create emotional connections with customers</p>
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
