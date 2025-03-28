import { Utensils } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { scrollToTop } from "@/lib/scrollHelper";

export default function BiryaniMahalCaseStudy() {
  const caseStudy = {
    icon: <Utensils className="h-8 w-8 text-white" />,
    iconBg: "bg-[#FF6B00]",
    title: "From Street Style to Premium Dining – Brand Transformation That Delivered",
    client: "Biryani Mahal",
    industry: "Restaurant / F&B",
    location: "Ranchi",
    serviceType: "Branding & Social Media Growth"
  };

  return (
    <CaseStudyLayout caseStudy={caseStudy}>
      <section>
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Overview</h2>
          <p className="text-gray-700 mb-6">
            Biryani Mahal is a family-run restaurant in Ranchi, known for its traditional flavors 
            but struggling to compete with larger chains. Their digital presence didn't match their culinary quality.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">The Challenge</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>No consistent branding (logo, menu, tone)</li>
            <li>No website or ordering option</li>
            <li>Low footfall during weekdays</li>
            <li>Poor online engagement on food delivery platforms</li>
            <li>Lack of awareness in upper-middle-class audience</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Our Strategy</h2>
          <p className="text-gray-700 mb-6">
            We designed a 360° brand transformation plan: new brand identity, emotional storytelling, 
            digital presence, and targeted promotions on social media and food apps.
          </p>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Execution</h2>
          <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-4">
            <li>
              <strong>Brand Makeover:</strong> Developed a premium, Mughlai-inspired brand identity 
              with a new logo, menu design, and packaging.
            </li>
            <li>
              <strong>Website Creation:</strong> Launched a mini website with the menu, gallery, 
              and contact information, optimized for mobile.
            </li>
            <li>
              <strong>Social Media Campaigns:</strong> Ran Instagram & Facebook campaigns around 
              food photography, chef stories, and customer reviews.
            </li>
            <li>
              <strong>Local Influencer Collaborations:</strong> Partnered with 5 Ranchi-based food 
              bloggers for shoutouts and tasting sessions.
            </li>
            <li>
              <strong>Offers & Loyalty Programs:</strong> Created time-sensitive offers and a basic 
              loyalty program promoted through QR codes and reels.
            </li>
          </ol>

          <h2 className="text-2xl font-semibold text-[#FF6B00] mb-6">Results</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>70% increase in dine-in footfall within 45 days</li>
            <li>3x social media engagement</li>
            <li>Improved Zomato/Swiggy ranking due to increased reviews & visibility</li>
            <li>Became a trending name among Ranchi's student and office crowd</li>
            <li>Reached 10,000+ Instagram followers organically within 2 months</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-8 mt-8">
            <h3 className="text-xl font-semibold mb-4">Client Testimonial</h3>
            <blockquote className="italic text-gray-700 border-l-4 border-[#FF6B00] pl-4">
              "The transformation has been unbelievable. People now perceive us as a premium brand, 
              and our weekdays are no longer empty. Synergy gave our restaurant a fresh life!"
            </blockquote>
            <p className="text-gray-600 mt-2">— Imran Khan, Owner, Biryani Mahal</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <Link to="/case-study/wishluv-buildcon" onClick={() => scrollToTop(true)}>
            <Button variant="outline" className="text-[#0066CC]">
              Previous Case Study: Wishluv Buildcon
            </Button>
          </Link>
          
          <Link to="/case-study/the-helping-hand" onClick={() => scrollToTop(true)}>
            <Button variant="outline" className="text-[#0066CC]">
              Next Case Study: The Helping Hand
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