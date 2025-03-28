import { Building2 } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function WishluvBuildconCaseStudy() {
  const caseStudy = {
    icon: <Building2 className="h-8 w-8 text-white" />,
    iconBg: "bg-[#0066CC]",
    title: "Lead Generation Breakthrough in Patna's Real Estate Market",
    client: "Wishluv Buildcon",
    industry: "Real Estate",
    location: "Patna",
    serviceType: "Lead Generation & Digital Transformation"
  };

  return (
    <CaseStudyLayout caseStudy={caseStudy}>
      <section>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Overview</h2>
          <p className="text-gray-700 mb-6">
            Wishluv Buildcon is a Patna-based real estate company specializing in premium plot sales and township development. 
            They had strong offline word-of-mouth but struggled to generate consistent leads online.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">The Challenge</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>No existing digital presence</li>
            <li>Inconsistent branding across channels</li>
            <li>No lead capture mechanism</li>
            <li>Relying solely on field agents for conversions</li>
            <li>Zero organic or paid digital lead flow</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Our Strategy</h2>
          <p className="text-gray-700 mb-6">
            We proposed a comprehensive digital lead generation system that combined a new high-converting website, 
            location-specific SEO, and targeted paid campaigns aimed at their ideal buyer persona.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Execution</h2>
          <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-4">
            <li>
              <strong>Website Development:</strong> Built a modern, mobile-first website with lead magnets, 
              WhatsApp integration, and clear CTA buttons.
            </li>
            <li>
              <strong>SEO Optimization:</strong> Focused on keywords like "plots for sale in Patna," 
              "township near Naubatpur," and "real estate investment Patna."
            </li>
            <li>
              <strong>Performance Marketing:</strong> Launched Facebook and Google Ads with location-targeting, 
              highlighting their offers and site visits.
            </li>
            <li>
              <strong>Landing Pages:</strong> Created separate landing pages for projects with testimonials, 
              images, and booking forms.
            </li>
            <li>
              <strong>Lead Funnel Setup:</strong> Used CRM integration to manage and nurture leads efficiently.
            </li>
            <li>
              <strong>Weekly Optimization:</strong> Regular review of ad spend, landing page A/B testing, 
              and keyword improvements.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Results</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>150+ qualified leads/month within 6 weeks</li>
            <li>Lead conversion rate jumped from 4% to 12%</li>
            <li>Website ranked on Google's 1st page for top 5 real estate keywords in Patna</li>
            <li>Full project ROI recovered within 3 months</li>
            <li>Real-time lead tracking helped their sales team improve response time by 60%</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-8 mt-8">
            <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
            <blockquote className="italic text-gray-700 border-l-4 border-[#FF6B00] pl-4">
              "Synergy helped us go from near-zero digital activity to a fully automated and scalable lead generation engine. 
              Now our plots are selling faster, and buyers are finding us online effortlessly."
            </blockquote>
            <p className="text-gray-600 mt-2">— Lawkush Sharma, Director, Wishluv Buildcon Pvt. Ltd.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <Link to="/case-study/biryani-mahal">
            <Button variant="outline" className="text-[#0066CC]">
              Next Case Study: Biryani Mahal
            </Button>
          </Link>
          
          <Link to="/#contact">
            <Button className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
              Get Similar Results for Your Business
            </Button>
          </Link>
        </div>
      </section>
    </CaseStudyLayout>
  );
}