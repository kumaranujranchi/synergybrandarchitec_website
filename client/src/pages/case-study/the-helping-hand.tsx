import { ShoppingBag } from "lucide-react";
import CaseStudyLayout from "@/components/case-study-layout";

export default function TheHelpingHandCaseStudy() {
  return (
    <CaseStudyLayout
      caseStudy={{
        icon: <ShoppingBag className="h-12 w-12" />,
        iconBg: "bg-green-100",
        title: "The Helping Hand",
        client: "The Helping Hand",
        industry: "E-commerce",
        location: "Patna",
        serviceType: "E-commerce Website Development, Digital Marketing"
      }}
    >
      <div className="space-y-8">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            The Helping Hand, a social enterprise selling handcrafted products made by local artisans, needed to transition from offline sales to an e-commerce model during the pandemic. They required a user-friendly website that would showcase their artisans' stories, highlight product quality, and provide a seamless shopping experience.
          </p>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Challenges</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Limited technical expertise within the organization</li>
            <li>Need for a cost-effective yet professional e-commerce solution</li>
            <li>Showcasing handcrafted products effectively in a digital format</li>
            <li>Building customer trust for a new online store</li>
            <li>Limited marketing budget to generate site traffic</li>
            <li>Requirement for simple inventory management for non-technical staff</li>
          </ul>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Custom E-commerce Website</h3>
              <p className="text-gray-700">
                Developed a custom WooCommerce solution with a user-friendly admin panel for easy product management. Implemented secure payment gateways and optimized the site for both desktop and mobile users.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Artisan-Centric Storytelling</h3>
              <p className="text-gray-700">
                Created dedicated sections for featuring artisan stories and crafting processes. Implemented high-quality product photography and detailed descriptions to highlight product uniqueness and quality.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Organic Marketing Strategy</h3>
              <p className="text-gray-700">
                Developed a content marketing strategy focused on sustainable living, supporting local artisans, and the stories behind handcrafted products. Utilized Pinterest and Instagram as primary social channels for driving traffic.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Email Marketing Automation</h3>
              <p className="text-gray-700">
                Set up automated email sequences for abandoned carts, post-purchase follow-ups, and loyalty programs. Created a newsletter featuring new artisans, product highlights, and impact stories.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-700 mb-2">324%</div>
              <div className="text-gray-700">Increase in sales compared to offline-only</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-700 mb-2">28%</div>
              <div className="text-gray-700">Average conversion rate (industry avg: 3.5%)</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-purple-700 mb-2">5,600+</div>
              <div className="text-gray-700">Email subscribers in the first 6 months</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-orange-700 mb-2">42%</div>
              <div className="text-gray-700">Increase in average order value</div>
            </div>
          </div>
          <p className="text-gray-700">
            The e-commerce platform not only helped The Helping Hand survive during the pandemic but allowed them to thrive with a much wider customer base. The organization has since been able to onboard more artisans and expand their product range significantly.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
          <blockquote className="italic border-l-4 border-green-500 pl-4 py-2 mb-4">
            "Working with Synergy Brand Architect has been transformative for our organization. When the pandemic hit, we had to pivot quickly, and their team helped us create not just an online store, but a digital home for our artisans' stories. The care and attention they put into understanding our social mission was exceptional."
          </blockquote>
          <p className="font-semibold">- Priya Verma, Founder, The Helping Hand</p>
        </section>
      </div>
    </CaseStudyLayout>
  );
}