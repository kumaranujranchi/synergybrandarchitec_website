import { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronLeft, Home, Building, Briefcase, MapPin } from "lucide-react";
import Header from "./header";
import Footer from "./footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scrollToTop } from "@/lib/scrollHelper";

interface CaseStudyLayoutProps {
  children: ReactNode;
  caseStudy: {
    icon: ReactNode;
    iconBg: string;
    title: string;
    client: string;
    industry: string;
    location: string;
    serviceType: string;
  };
}

export default function CaseStudyLayout({ children, caseStudy }: CaseStudyLayoutProps) {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="flex items-center hover:text-[#0066CC]">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/#case-studies" className="hover:text-[#0066CC]">
                Case Studies
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{caseStudy.title}</span>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <Link href="/#case-studies" className="inline-flex items-center text-[#0066CC] hover:text-[#0066CC]/80 mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to all case studies
              </Link>
              
              <div className={`${caseStudy.iconBg} p-5 rounded-full mb-6`}>
                {caseStudy.icon}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{caseStudy.title}</h1>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5 px-3">
                  <Building className="w-3.5 h-3.5" />
                  {caseStudy.client}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5 px-3">
                  <Briefcase className="w-3.5 h-3.5" />
                  {caseStudy.industry}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5 px-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {caseStudy.location}
                </Badge>
              </div>
              
              <div className="max-w-3xl">
                <p className="text-lg text-gray-600">Service Type: <span className="font-medium text-gray-900">{caseStudy.serviceType}</span></p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {children}
            
            <div className="mt-16 pt-12 border-t text-center">
              <h2 className="text-2xl font-bold mb-6">Ready to achieve similar results for your business?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-[#FF6B00] hover:bg-[#FF8533] text-white px-8"
                  onClick={() => {
                    scrollToTop();
                    setTimeout(() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  Contact Us Today
                </Button>
                <Link href="/#case-studies">
                  <Button variant="outline" className="px-8">
                    View More Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}