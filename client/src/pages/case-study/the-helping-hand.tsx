import { ShoppingBag } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToTop } from "@/lib/scrollHelper";

export default function TheHelpingHandCaseStudy() {
  const caseStudy = {
    icon: <ShoppingBag className="h-8 w-8 text-white" />,
    iconBg: "bg-[#0066CC]",
    title: "Helping a Local Business Go Global – 200% Revenue Growth Online",
    client: "The Helping Hand",
    industry: "E-commerce",
    location: "Patna",
    serviceType: "Website Development & Performance Marketing"
  };

  return (
    <CaseStudyLayout caseStudy={caseStudy}>
      <section>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Overview</h2>
          <p className="text-gray-700 mb-6">
            The Helping Hand is an e-commerce brand from Patna that sells handmade, sustainable utility products. 
            They wanted to expand beyond offline exhibitions and WhatsApp orders but didn't know where to begin.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">The Challenge</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>No website or digital catalog</li>
            <li>Inconsistent social presence</li>
            <li>Manual order taking (via WhatsApp/Instagram)</li>
            <li>Limited reach outside Patna</li>
            <li>No retargeting or repeat customer strategy</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Our Strategy</h2>
          <p className="text-gray-700 mb-6">
            We decided to build their online store from scratch, enhance branding, 
            and use paid ads plus email marketing to scale revenue.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Execution</h2>
          <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-4">
            <li>
              <strong>Custom E-commerce Website:</strong> Developed a clean and fast e-commerce site with React + Node.js, 
              including cart, order tracking, and mobile responsiveness.
            </li>
            <li>
              <strong>Brand Identity Refresh:</strong> Gave a clean and eco-friendly visual identity with new logo, 
              product photos, and color palette.
            </li>
            <li>
              <strong>Content Strategy:</strong> Wrote compelling product descriptions and story-based content 
              about their mission and artisans.
            </li>
            <li>
              <strong>Performance Ads:</strong> Ran niche-targeted Meta & Google Shopping ads in Tier-1 cities across India.
            </li>
            <li>
              <strong>Email Automation:</strong> Set up abandoned cart recovery, order confirmation, 
              and newsletter automation via Mailchimp.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Results</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>200% revenue increase in 6 months</li>
            <li>Monthly orders went from 30 to 100+</li>
            <li>Average order value increased by 22%</li>
            <li>Customers from 10+ Indian cities</li>
            <li>4.9/5 customer rating on website and Google</li>
            <li>Built an email list of 1,200+ loyal customers</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-8 mt-8">
            <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
            <blockquote className="italic text-gray-700 border-l-4 border-[#FF6B00] pl-4">
              "Earlier, our business felt like a hobby. Now, it's a real brand. Thanks to Synergy, 
              we're growing beyond Patna and reaching eco-conscious customers nationwide."
            </blockquote>
            <p className="text-gray-600 mt-2">— Shradha Kumari, Founder, The Helping Hand</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <Link to="/case-study/biryani-mahal" onClick={() => scrollToTop(true)}>
            <Button variant="outline" className="text-[#0066CC]">
              Previous Case Study: Biryani Mahal
            </Button>
          </Link>
          
          <Link to="/#contact" onClick={() => scrollToTop(true)}>
            <Button className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
              Get Similar Results for Your Business
            </Button>
          </Link>
        </div>
      </section>
    </CaseStudyLayout>
  );
}