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
  underDevelopment?: boolean;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "thakur-tax",
    title: "Thakur Tax Consultant",
    category: "Tax Consultancy",
    description: "Professional tax consultancy website serving Patna, Bihar with comprehensive financial, legal & business solutions. Features services for individuals, startups, and businesses with expert team profiles.",
    image: "https://imagizer.imageshack.com/img923/5595/NnzZNX.png",
    results: ["Taxation Services", "Business Registration", "Legal Services", "Expert Team Profiles"],
    link: "https://thakurtax.com/",
    featured: true,
    external: true
  },
  {
    id: "arvindu-hospitals",
    title: "Arvindu Hospitals",
    category: "Healthcare",
    description: "Modern healthcare website designed in React and Node.js with a sophisticated backend panel for lead and content management, hosted on Hostinger for optimal performance.",
    image: "https://imagizer.imageshack.com/img922/2527/Mk1L6F.png",
    results: ["React & Node.js", "Content Management", "Hostinger Hosting"],
    link: "https://arvinduhospitals.com/",
    featured: true,
    external: true
  },
  {
    id: "wishluv-buildcon",
    title: "Wishluv Buildcon",
    category: "Real Estate",
    description: "Real estate developer website developed using HTML, CSS, JavaScript, and PHP, including an admin panel for lead tracking and job-application management.",
    image: "https://imagizer.imageshack.com/img922/8049/BTbxRO.png",
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
    image: "https://imagizer.imageshack.com/img923/2500/wiPGCK.png",
    results: ["Construction Services", "Project Portfolio", "Professional Design", "Service Showcase"],
    link: "https://www.omavopconstructions.com/",
    featured: true,
    external: true
  },
  {
    id: "studio-nine-constructions",
    title: "Studio Nine Constructions",
    category: "Construction",
    description: "Modern construction studio website featuring architectural services, construction projects, and design solutions with contemporary aesthetics and professional presentation.",
    image: "https://imagizer.imageshack.com/img922/1066/c15u20.png",
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
    image: "https://imagizer.imageshack.com/img923/2054/zY7aJK.png",
    results: ["Business Solutions", "Consulting Services", "Corporate Support", "Clean Design"],
    link: "https://magadhassociate.netlify.app/",
    featured: false,
    external: true
  },
  {
    id: "honest-choice-review",
    title: "Honest Choice Review",
    category: "Review Platform",
    description: "Comprehensive product review platform featuring honest reviews, detailed comparisons, and user-friendly interface for informed purchasing decisions across various product categories.",
    image: "https://imagizer.imageshack.com/img924/2382/6pj4j8.png",
    results: ["Product Reviews", "Comparison Tools", "User Interface", "Content Management"],
    link: "https://honestchoicereview.com/",
    featured: false,
    external: true
  },
  {
    id: "atlantis-hospital",
    title: "Atlantis Hospital",
    category: "Healthcare",
    description: "Modern healthcare website showcasing medical services, doctor profiles, and patient care facilities with responsive design and comprehensive healthcare information system.",
    image: "https://imagizer.imageshack.com/img922/7175/NKsceK.png",
    results: ["Medical Services", "Doctor Profiles", "Patient Care", "Responsive Design"],
    link: "https://atlantishospital.netlify.app/",
    featured: false,
    external: true
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "E-Commerce",
    description: "Comprehensive e-commerce solution featuring product catalog, shopping cart, payment integration, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    image: "https://imagizer.imageshack.com/img924/2739/5Wukyg.png",
    results: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Admin Dashboard"],
    link: "",
    featured: false,
    external: false,
    underDevelopment: true
  },
  {
    id: "property-listing-site",
    title: "Property Listing Platform",
    category: "Real Estate",
    description: "Advanced property listing website with search filters, property details, virtual tours, and agent management system. Designed for seamless property browsing and real estate transactions.",
    image: "https://imagizer.imageshack.com/img922/9873/8oOHSx.png",
    results: ["Property Search", "Virtual Tours", "Agent Management", "Advanced Filters"],
    link: "",
    featured: false,
    external: false,
    underDevelopment: true
  },
  {
    id: "sales-portfolio-synergy",
    title: "Sales Portfolio Synergy",
    category: "Business Services",
    description: "Professional sales portfolio website showcasing business achievements, client testimonials, and service offerings. Features modern design with interactive elements and comprehensive business presentation.",
    image: "https://imagizer.imageshack.com/img923/2218/FTdIZi.png",
    results: ["Portfolio Showcase", "Client Testimonials", "Service Presentation", "Responsive Design"],
    link: "https://salesportfoliosynergy.netlify.app/",
    featured: false,
    external: true
  },
  {
    id: "sales-dashboard",
    title: "Sales Dashboard",
    category: "Web Application",
    description: "Comprehensive sales dashboard web application with real-time analytics, performance tracking, and data visualization. Built for sales teams to monitor KPIs, track leads, and analyze business metrics.",
    image: "https://imagizer.imageshack.com/img924/7983/U9Kl2q.png",
    results: ["Dashboard Analytics", "Sales Tracking", "Data Visualization", "Real-time Metrics"],
    link: "https://sales.wishluvbuildcon.com/",
    featured: false,
    external: true
  },
  {
    id: "astroprakash",
    title: "Astro Prakash",
    category: "Astrology & Spirituality",
    description: "Professional Vedic astrology website offering personalized horoscope analysis, remedial solutions, and spiritual guidance. Features 20+ years of experience with 10,000+ satisfied clients and comprehensive astrology services.",
    image: "https://imagizer.imageshack.com/img923/8688/jNx1bz.png",
    results: ["Vedic Astrology", "Personalized Horoscopes", "Remedial Solutions", "Spiritual Guidance", "20+ Years Experience"],
    link: "https://astroprakash.in/",
    featured: false,
    external: true
  },
  {
    id: "manokamna-properties",
    title: "Manokamna Properties",
    category: "Real Estate",
    description: "Complete digital transformation for Manokamna Properties, a leading real estate company. Enhanced their online presence with modern web design, property listings, and lead generation system.",
    image: "https://imagizer.imageshack.com/img923/1130/rryKGk.png",
    results: [
      "400% increase in property inquiries",
      "Enhanced property showcase with virtual tours",
      "Streamlined lead management system",
      "Mobile-optimized property search experience"
    ],
    link: "https://manokamnaproperties.in/",
    featured: false,
    external: true
  },
  {
    id: "abacuswalla",
    title: "Abacuswalla",
    category: "Education",
    description: "Professional educational platform dedicated to abacus training and mental arithmetic development. Features comprehensive learning modules, interactive tools, and student progress tracking for enhanced cognitive skills development.",
    image: "https://imagizer.imageshack.com/img922/175/jJ6gch.png",
    results: [
      "Interactive Learning Modules",
      "Mental Arithmetic Training",
      "Student Progress Tracking",
      "Cognitive Skills Development"
    ],
    link: "",
    featured: false,
    external: false
  },
  {
    id: "spectro-elecator",
    title: "Spectro Elecator",
    category: "Industrial",
    description: "Modern industrial website showcasing elevator and escalator solutions with advanced technology integration. Features product catalog, service offerings, and comprehensive specifications for commercial and residential installations.",
    image: "https://imagizer.imageshack.com/img922/640/tCSbh7.png",
    results: [
      "Product Catalog",
      "Service Offerings",
      "Technical Specifications",
      "Installation Solutions"
    ],
    link: "",
    featured: false,
    external: false
  }
];

const categories = [
  "All",
  "Tax Consultancy",
  "Healthcare",
  "Real Estate",
  "Construction",
  "Business Services",
  "Review Platform",
  "E-Commerce",
  "Web Application",
  "Astrology & Spirituality",
  "Education",
  "Industrial"
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
                <span className="text-sm font-medium">16 Projects</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {portfolioItems.filter(item => item.featured).map((item) => (
              <div key={item.id} className="portfolio-card bg-white shadow-lg border border-gray-100 group">
                <div className="portfolio-image-container">
                  <img
                    src={item.image}
                    alt={`${item.title} - Full website preview showing complete page layout and design`}
                    className="portfolio-image"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-card bg-white shadow-md border border-gray-100 group">
                <div className="portfolio-image-container">
                  <img
                    src={item.image}
                    alt={`${item.title} - Full website preview showing complete page layout and design`}
                    className="portfolio-image"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#0066CC] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-[#FF6B00] text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
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
                    {item.underDevelopment ? (
                      <Button variant="outline" size="sm" className="text-gray-500 border-gray-300 bg-gray-50 cursor-not-allowed" disabled>
                        Under Development
                      </Button>
                    ) : item.external ? (
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

          {/* View More CTA Button */}
          <div className="text-center mt-12">
            <Link href="/#contact">
              <Button className="bg-[#0066CC] hover:bg-[#0052A3] text-white font-semibold py-4 px-8 rounded-full text-lg transition-all hover:shadow-lg hover:scale-105">
                View More Projects & Get Started
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <p className="text-gray-600 font-inter mt-4 text-sm">
              Ready to create your next success story? Let's discuss your project!
            </p>
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
                <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#FF6B00] font-semibold py-3 px-8 rounded-full text-lg transition-all">
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
