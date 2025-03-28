import { UtensilsCrossed } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";

export default function BiryaniMahalCaseStudy() {
  return (
    <CaseStudyLayout
      caseStudy={{
        icon: <UtensilsCrossed className="h-12 w-12" />,
        iconBg: "bg-orange-100",
        title: "Biryani Mahal",
        client: "Biryani Mahal",
        industry: "Restaurant",
        location: "Patna",
        serviceType: "Social Media Management, Local SEO"
      }}
    >
      <div className="space-y-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            Biryani Mahal, a family-owned restaurant in Patna known for its authentic Biryani recipes, sought to expand their customer base and increase online orders. Despite having a loyal customer base, they were struggling to attract new customers and compete against chain restaurants with larger marketing budgets.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Challenges</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Limited online presence and outdated website</li>
            <li>Poor visibility in local search results</li>
            <li>Lack of engaging social media content</li>
            <li>No systematic approach to customer reviews and feedback</li>
            <li>Strong competition from both local and chain restaurants</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Local SEO Optimization</h3>
              <p className="text-gray-700">
                We optimized their Google Business Profile, created local citations, and developed location-specific content to improve their visibility in local search results. We also implemented schema markup for restaurants to enhance rich snippets in search results.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Content Strategy & Social Media Management</h3>
              <p className="text-gray-700">
                Developed a content calendar focused on showcasing their signature dishes, behind-the-scenes preparation, chef stories, and customer testimonials. Implemented consistent posting schedules across Instagram and Facebook with high-quality food photography.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Influencer Collaborations</h3>
              <p className="text-gray-700">
                Partnered with local food bloggers and influencers for authentic reviews and content creation. Organized tasting events to generate buzz and create shareable content.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Review Management</h3>
              <p className="text-gray-700">
                Implemented a systematic approach to encourage and manage customer reviews across Google, Zomato, and other platforms. Developed response templates and strategies for both positive and negative reviews.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-700 mb-2">186%</div>
              <div className="text-gray-700">Increase in online orders</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-700 mb-2">245%</div>
              <div className="text-gray-700">Growth in Instagram followers</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-700 mb-2">4.8</div>
              <div className="text-gray-700">Average Google rating (up from 3.6)</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-700 mb-2">312%</div>
              <div className="text-gray-700">Increase in Google Business Profile views</div>
            </div>
          </div>
          <p className="text-gray-700">
            The campaign helped Biryani Mahal establish itself as a prominent dining destination in Patna. Their increased online visibility has led to a steady stream of new customers, and their enhanced social media presence has helped them build a stronger community around their brand.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
          <blockquote className="italic border-l-4 border-orange-500 pl-4 py-2 mb-4">
            "Before working with Synergy Brand Architect, we were relying solely on word-of-mouth. Their team completely transformed our digital presence. The quality of their work and attention to detail has been exceptional. Our restaurant is busier than ever, especially with new customers who found us online."
          </blockquote>
          <p className="font-semibold">- Aman Khan, Owner, Biryani Mahal</p>
        </section>
      </div>
    </CaseStudyLayout>
  );
}