import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useLocation } from "wouter";

export default function SearchPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Get search query from URL parameter
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.search = `?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Search
            </h1>
            <p className="text-lg md:text-xl opacity-95 mb-8">
              Find what you're looking for
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, blog posts, case studies..."
                  className="w-full px-6 py-4 pr-14 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6B35] text-white p-3 rounded-full hover:bg-[#E85A2A] transition-colors"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {searchQuery ? (
              <>
                <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-8 text-[#333333]">
                  Search Results for "{searchQuery}"
                </h2>
                
                {/* Quick Links */}
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="font-poppins font-semibold text-xl mb-4 text-[#333333]">
                    Explore Our Content
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setLocation("/blog")}
                      className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-[#FF6B35] mb-2">Blog</h4>
                      <p className="text-sm text-gray-600">Digital marketing insights and tips</p>
                    </button>
                    
                    <button
                      onClick={() => setLocation("/case-study")}
                      className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-[#FF6B35] mb-2">Case Studies</h4>
                      <p className="text-sm text-gray-600">Success stories from our clients</p>
                    </button>
                    
                    <button
                      onClick={() => setLocation("/services")}
                      className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-[#FF6B35] mb-2">Services</h4>
                      <p className="text-sm text-gray-600">Explore our digital marketing services</p>
                    </button>
                    
                    <button
                      onClick={() => setLocation("/contact")}
                      className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-semibold text-[#FF6B35] mb-2">Contact Us</h4>
                      <p className="text-sm text-gray-600">Get in touch with our team</p>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Enter a search term above to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <WhatsappButton />
      <Footer />
    </div>
  );
}
