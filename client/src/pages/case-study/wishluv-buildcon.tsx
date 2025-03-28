import { Building2 } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";

export default function WishluvBuildconCaseStudy() {
  return (
    <CaseStudyLayout
      caseStudy={{
        icon: <Building2 className="h-12 w-12" />,
        iconBg: "bg-blue-100",
        title: "Wishluv Buildcon",
        client: "Wishluv Buildcon",
        industry: "Real Estate",
        location: "Patna",
        serviceType: "Lead Generation, Digital Marketing"
      }}
    >
      <div className="space-y-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            Wishluv Buildcon, a prominent real estate developer in Patna, was looking to enhance their digital presence and generate quality leads for their new residential project. The client needed a comprehensive digital marketing strategy to increase brand visibility, establish credibility in the market, and drive interested buyers to their sales team.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Challenges</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Highly competitive local real estate market with established players</li>
            <li>Limited digital presence and brand recognition</li>
            <li>Need for qualified leads rather than general inquiries</li>
            <li>Building trust in a market where customers are cautious about property investments</li>
            <li>Creating compelling content that highlights unique selling propositions</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Targeted Digital Campaign</h3>
              <p className="text-gray-700">
                We created a multi-platform digital marketing campaign focusing on Facebook, Google Ads, and Instagram. The campaign targeted potential home buyers in Patna with specific demographic and interest-based parameters to ensure maximum relevance.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Content Strategy</h3>
              <p className="text-gray-700">
                Developed compelling visual content showcasing property highlights, neighborhood benefits, and financing options. Created virtual tours and 3D renderings to give potential buyers an immersive experience.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Lead Capture Optimization</h3>
              <p className="text-gray-700">
                Designed high-converting landing pages with clear call-to-actions and lead capture forms. Implemented lead qualification processes to filter serious buyers from general inquiries.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Remarketing Campaigns</h3>
              <p className="text-gray-700">
                Set up remarketing campaigns to target users who had previously shown interest but hadn't converted, keeping the property top-of-mind during the decision-making process.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-700 mb-2">230%</div>
              <div className="text-gray-700">Increase in qualified leads</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-700 mb-2">42%</div>
              <div className="text-gray-700">Decrease in cost per acquisition</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-700 mb-2">18</div>
              <div className="text-gray-700">Property bookings directly attributed to digital marketing</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-700 mb-2">156%</div>
              <div className="text-gray-700">Increase in website traffic</div>
            </div>
          </div>
          <p className="text-gray-700">
            The campaign not only exceeded the lead generation targets but also helped Wishluv Buildcon establish a stronger brand presence in the local real estate market. The content created continues to drive organic traffic and leads even after the paid campaign period.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
          <blockquote className="italic border-l-4 border-blue-500 pl-4 py-2 mb-4">
            "Synergy Brand Architect transformed our digital marketing approach. Their strategic campaign delivered not just numbers but quality leads that converted into actual sales. Their understanding of the real estate market and buyer psychology was evident in every aspect of the campaign."
          </blockquote>
          <p className="font-semibold">- Rajesh Kumar, Marketing Director, Wishluv Buildcon</p>
        </section>
      </div>
    </CaseStudyLayout>
  );
}