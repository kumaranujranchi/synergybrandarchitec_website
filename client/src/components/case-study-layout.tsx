import React, { ReactNode, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
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
  // Scroll to top when case study page is loaded
  useEffect(() => {
    scrollToTop(false);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <WhatsappButton />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/#case-studies" onClick={() => scrollToTop(true)}>
              <button className="flex items-center text-[#0066CC] hover:text-[#004C99] transition-colors font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Case Studies
              </button>
            </Link>
          </div>
          
          {/* Case Study Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-2 rounded-lg ${caseStudy.iconBg}`}>
                {caseStudy.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{caseStudy.client}</h1>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              {caseStudy.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Industry</span>
                <span className="font-medium">{caseStudy.industry}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Location</span>
                <span className="font-medium">{caseStudy.location}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Service Type</span>
                <span className="font-medium">{caseStudy.serviceType}</span>
              </div>
            </div>
          </div>
          
          {/* Case Study Content */}
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}