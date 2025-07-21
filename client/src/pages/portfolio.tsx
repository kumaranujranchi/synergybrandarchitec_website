import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Star, Users, Calendar, Target } from "lucide-react";
import { Link } from "wouter";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  results: string[];
  link: string;
  featured?: boolean;
  external?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "thakur-tax",
    title: "Thakur Tax Consultant",
    category: "Tax Consultancy",
    description: "Professional tax consultancy website serving Patna, Bihar with comprehensive financial, legal & business solutions. Features services for individuals, startups, and businesses with expert team profiles.",
    image: "/images/portfolio/thakur-tax-screenshot.png",
    results: ["Taxation Services", "Business Registration", "Legal Services", "Expert Team Profiles"],
    link: "https://thakurtax.com/",
    featured: true,
    external: true
  },
  {
    id: "arvindu-hospitals",
    title: "Arvindu Hospitals",
    category: "Healthcare",
    description: "Modern healthcare website designed in React and Node.js with a sophisticated backend panel for lead and blog management, hosted on Hostinger for optimal performance.",
    image: "/images/portfolio/arvindu-hospital-screenshot.png",
    results: ["React & Node.js", "Blog Management", "Hostinger Hosting"],
    link: "https://arvinduhospitals.com/",
    featured: true,
    external: true
  },
  {
    id: "wishluv-buildcon",
    title: "Wishluv Buildcon",
    category: "Real Estate",
    description: "Real estate developer website developed using HTML, CSS, JavaScript, and PHP, including an admin panel for lead tracking and job-application management.",
    image: "/images/portfolio/wishluv-buildcon-screenshot.png",
    results: ["HTML/CSS/JS", "PHP Backend", "Job Application System"],
    link: "https://wishluvbuildcon.com/",
    featured: true,
    external: true
  },
  {
    id: "omavop-constructions",
    title: "Omavop Constructions",
    category: "Construction",
    description: "Professional construction company website showcasing building services, project portfolio, and construction expertise with modern design and comprehensive service offerings.",
    image: "https://imagizer.imageshack.com/img922/3286/VtWDzJ.png",
    results: ["Construction Services", "Project Portfolio", "Professional Design", "Service Showcase"],
    link: "https://www.omavopconstructions.com/",
    featured: false,
    external: true
  },
  {
    id: "studio-nine-constructions",
    title: "Studio Nine Constructions",
    category: "Construction",
    description: "Modern construction studio website featuring architectural services, construction projects, and design solutions with contemporary aesthetics and professional presentation.",
    image: "https://imagizer.imageshack.com/img923/9664/Alz7gH.png",
    results: ["Architectural Services", "Construction Projects", "Design Solutions", "Modern Interface"],
    link: "https://studionineconstructions.com/",
    featured: false,
    external: true
  },
  {
    id: "magadh-associate",
    title: "Magadh Associate",
    category: "Business Services",
    description: "Professional business associate website providing comprehensive business solutions, consulting services, and corporate support with clean design and user-friendly interface.",
    image: "https://imagizer.imageshack.com/img923/9720/SxhBsL.png",
    results: ["Business Solutions", "Consulting Services", "Corporate Support", "Clean Design"],
    link: "https://magadhassociate.netlify.app/",
    featured: false,
    external: true
  }
];

const categories = [
  "All",
  "Tax Consultancy",
  "Healthcare",
  "Real Estate",
  "Construction",
  "Business Services"
];

export default function PortfolioPage() {
  useEffect(() => {
    document.title = "Portfolio | Our Work & Case Studies - Synergy Brand Architect";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
              Our <span className="text-[#FF6B00]">Portfolio</span> of Success Stories
            </h1>
            <p className="text-xl text-gray-600 font-inter mb-8">
              Explore our diverse portfolio of live websites across multiple industries, showcasing our expertise 
              in full-stack development, modern technologies, and comprehensive backend solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Star className="w-5 h-5 text-[#FF6B00]" />
                <span className="text-sm font-medium">6 Live Websites</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-[#0066CC]" />
                <span className="text-sm font-medium">Multiple Industries</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <Target className="w-5 h-5 text-[#FF6B00]" />
                <span className="text-sm font-medium">Full-Stack Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Featured <span className="text-[#FF6B00]">Case Studies</span>
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Our latest and most comprehensive web development projects, featuring modern technologies and full-stack solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {portfolioItems.filter(item => item.featured).map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {item.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                  
                  {item.external ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-md">
                        Visit Website
                        <ExternalLink size={16} className="ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={item.link}>
                      <Button className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-md">
                        View Case Study
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
              Our <span className="text-[#0066CC]">Complete Portfolio</span>
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Explore our diverse range of projects across different industries and business sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0066CC] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Recent Project</span>
                    </div>
                    {item.external ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white">
                          Visit Site
                          <ExternalLink size={14} className="ml-1" />
                        </Button>
                      </a>
                    ) : item.link !== "#" ? (
                      <Link href={item.link}>
                        <Button variant="outline" size="sm" className="text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white">
                          View Details
                          <ExternalLink size={14} className="ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" className="text-gray-500 border-gray-300" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-white/90 font-inter mb-8">
              Let's discuss how we can help transform your business with our proven strategies and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button className="bg-white text-[#FF6B00] hover:bg-gray-100 font-semibold py-3 px-8 rounded-full text-lg transition-all hover:shadow-lg">
                  Get Free Consultation
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#FF6B00] font-semibold py-3 px-8 rounded-full text-lg transition-all">
                  View Our Services
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