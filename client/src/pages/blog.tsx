import { useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, User, ArrowRight, TrendingUp, MapPin, Users } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  icon: any;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Digital Marketing Trends to Watch in 2023",
    excerpt: "The digital marketing space is transforming rapidly. From AI-powered personalization to voice search optimization, discover the trends shaping the future of marketing and how to leverage them for your business.",
    date: "January 15, 2025",
    author: "Synergy Team",
    category: "Digital Marketing",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    icon: TrendingUp
  },
  {
    id: 2,
    title: "The Ultimate Guide to Local SEO for Patna Businesses",
    excerpt: "Standing out locally is crucial for Patna businesses. Learn actionable steps to optimize your Google Business Profile, build citations, and dominate local search results to attract customers in your neighborhood.",
    date: "January 18, 2025",
    author: "Synergy Team",
    category: "SEO",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop",
    icon: MapPin
  },
  {
    id: 3,
    title: "How to Build a Brand That Resonates With Your Audience",
    excerpt: "A brand is more than a logo—it's an emotional connection. Discover how to define your brand purpose, develop a distinct voice, and create authentic experiences that turn customers into loyal advocates.",
    date: "January 20, 2025",
    author: "Synergy Team",
    category: "Branding",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    icon: Users
  }
];

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0066CC] to-[#004999] text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Insights, tips, and strategies to help you grow your digital presence and build a remarkable brand.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Digital Marketing
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                SEO & Local Search
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                Brand Building
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const IconComponent = post.icon;
                return (
                  <article 
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#FF6B00] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0066CC] transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                        <button className="flex items-center gap-2 text-[#0066CC] font-semibold text-sm group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Coming Soon Message */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0066CC] to-[#004999] rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  More Content Coming Soon!
                </h3>
                <p className="text-gray-600 mb-6">
                  We're constantly creating valuable content to help you succeed. Subscribe to our newsletter to get notified when we publish new articles.
                </p>
                <a 
                  href="/#contact" 
                  className="inline-block bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold px-8 py-3 rounded-lg transition-all"
                >
                  Stay Updated
                </a>
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
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's work together to build a brand that stands out and drives real results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/#contact" 
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold px-8 py-4 rounded-lg transition-all inline-flex items-center gap-2"
              >
                Get Started Today
                <ArrowRight size={20} />
              </a>
              <a 
                href="/services" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg transition-all border border-white/30"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
