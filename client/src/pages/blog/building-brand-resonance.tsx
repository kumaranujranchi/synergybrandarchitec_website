import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { useEffect } from "react";
import { Calendar, User, Users, Share2 } from 'lucide-react';
import { useLocation } from "wouter";

export default function BuildingBrandResonance() {
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
                Branding
              </span>
              <span className="text-white/80 text-sm">6 min read</span>
            </div>
            
            <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-6">
              How to Build a Brand That Resonates With Your Audience
            </h1>
            
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Synergy Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>January 20, 2025</span>
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
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
              alt="Building Brand Resonance"
              className="w-full h-[400px] object-cover rounded-lg mb-12"
            />

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333]">
                Introduction
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                In today's crowded marketplace, having a product or service isn't enough. Your brand needs to create an emotional connection with your audience—a connection so strong that customers don't just buy from you, they advocate for you. This is what we call brand resonance, and it's the ultimate goal of successful branding.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                1. Define Your Brand Purpose
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A brand is more than a logo or a tagline—it starts with purpose. Ask yourself:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Why does your business exist beyond making money?</li>
                <li>What problem are you solving for your customers?</li>
                <li>What values drive your business decisions?</li>
                <li>How do you want to make people feel?</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Your purpose should be authentic and reflected in everything you do. When customers understand and believe in your purpose, they're more likely to connect with your brand on a deeper level.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                2. Know Your Audience Inside Out
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                You can't resonate with everyone, and that's okay. Focus on understanding your ideal customer:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>What are their pain points and aspirations?</li>
                <li>What language do they use?</li>
                <li>Where do they spend their time online and offline?</li>
                <li>What motivates their purchasing decisions?</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Create detailed buyer personas and use them to guide all your branding and marketing decisions.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                3. Develop a Distinct Brand Voice
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Your brand voice is how you communicate with your audience. It should be consistent across all touchpoints—from your website copy to social media posts to customer service interactions.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Are you professional and authoritative? Friendly and approachable? Bold and innovative? Whatever your voice, make sure it aligns with your brand purpose and resonates with your target audience.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                4. Create Consistent Visual Identity
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Visual consistency builds recognition and trust. Your visual identity includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Logo design that reflects your brand personality</li>
                <li>Color palette that evokes the right emotions</li>
                <li>Typography that enhances readability and brand character</li>
                <li>Photography and imagery style</li>
                <li>Design patterns and elements</li>
              </ul>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Document these elements in a brand style guide to ensure consistency across all platforms.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                5. Deliver Authentic Experiences
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Brand resonance happens when your actions match your promises. Every interaction a customer has with your brand should reinforce your brand identity and values.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                This means delivering exceptional customer service, creating valuable content, maintaining quality standards, and being transparent in your communications.
              </p>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                6. Build Community and Engagement
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Strong brands create communities around shared values and interests. Engage with your audience through:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 leading-relaxed space-y-2">
                <li>Social media conversations and user-generated content</li>
                <li>Events and experiences (online or offline)</li>
                <li>Loyalty programs and exclusive offers</li>
                <li>Behind-the-scenes content that humanizes your brand</li>
              </ul>

              <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-6 text-[#333333] mt-12">
                Conclusion
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Building a brand that resonates with your audience doesn't happen overnight. It requires a clear purpose, deep understanding of your audience, consistent communication, authentic experiences, and ongoing engagement. When you get it right, you create loyal advocates who don't just buy from you—they believe in you and actively promote your brand to others.
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
                Ready to Build a Powerful Brand?
              </h3>
              <p className="mb-6 opacity-95">
                Let our branding experts help you create a brand that truly resonates with your audience.
              </p>
              <button
                onClick={() => setLocation("/contact")}
                className="bg-white text-[#FF6B35] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Start Your Branding Journey
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
                  onClick={() => setLocation("/blog/local-seo-guide")}
                  className="text-left p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-[#0066CC] mb-2">
                    The Ultimate Guide to Local SEO for Patna Businesses
                  </h4>
                  <p className="text-sm text-gray-600">Dominate local search</p>
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
