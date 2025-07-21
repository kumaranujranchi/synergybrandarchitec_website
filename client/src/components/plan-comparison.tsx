import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Define plan data
const plans = [
  {
    name: "LITE",
    color: "#6C3CE9",
    description: "Best for small businesses or startups just beginning their online journey.",
    features: [
      {
        title: "Website Creation, Domain, and Hosting (1 Year):",
        description: "Basic static website with essential features to showcase your business. Includes domain registration and hosting for 1 year."
      },
      {
        title: "Social Media Handling:",
        description: "Manage 3 social media accounts: Facebook, Instagram, and X. Build presence and engage with followers."
      },
      {
        title: "Brand Growth Posts (Organic Followers):",
        description: "8 posts per month to organically grow followers and enhance brand visibility."
      },
      {
        title: "Website SEO Optimization:",
        description: "Basic SEO to improve search engine visibility and website ranking."
      },
      {
        title: "Keyword Research & Ranking:",
        description: "Basic keyword research to identify relevant terms."
      },
      {
        title: "Video Posts for YouTube and Reels:",
        description: "2 video posts per month for brand engagement on YouTube and Instagram Reels."
      },
      {
        title: "Digital Access Creation:",
        description: "Creation of brand assets like logo, letterhead, visiting card, personalized QR code, and glow sign design."
      }
    ]
  },
  {
    name: "MAX",
    color: "#41D52E",
    description: "Ideal for established businesses looking to maintain a professional online presence.",
    features: [
      {
        title: "Website Creation, Domain, and Hosting (1 Year):",
        description: "Static website with added features, suitable for informational content. Domain and hosting for 1 year included."
      },
      {
        title: "Social Media Handling:",
        description: "Manage 4 social media accounts: Facebook, Instagram, Pinterest, and X/YouTube."
      },
      {
        title: "Brand Growth Posts (Organic Followers):",
        description: "Same as Lite with more refined content strategy."
      },
      {
        title: "Website SEO Optimization:",
        description: "SEO services with keyword optimization for 3 target keywords."
      },
      {
        title: "Keyword Research & Ranking:",
        description: "Research and ranking on 3 strategic keywords to boost visibility."
      },
      {
        title: "Video Posts for YouTube and Reels:",
        description: "4 video posts per month, focusing on storytelling and brand building."
      },
      {
        title: "Digital Access Creation:",
        description: "Same as Lite with additional customization on request."
      },
      {
        title: "Content Marketing:",
        description: "4 social media posts per week to boost engagement and brand awareness."
      }
    ]
  },
  {
    name: "PRO",
    color: "#6C3CE9",
    description: "Perfect for businesses serious about growing their online presence and engagement.",
    features: [
      {
        title: "Website Creation, Domain, and Hosting (1 Year):",
        description: "Same as Max, with additional customization options for content and design."
      },
      {
        title: "Social Media Handling:",
        description: "Same as Max with extra focus on content consistency and engagement strategies."
      },
      {
        title: "Brand Growth Posts (Organic Followers):",
        description: "Same as Max, focusing on targeted content to attract niche audiences."
      },
      {
        title: "Website SEO Optimization:",
        description: "Advanced SEO, optimizing for 5 target keywords for better ranking."
      },
      {
        title: "Keyword Research & Ranking:",
        description: "Detailed keyword research with ranking for 5 competitive keywords."
      },
      {
        title: "Video Posts for YouTube and Reels:",
        description: "Same as Max with professional editing and content strategy."
      },
      {
        title: "Digital Access Creation:",
        description: "Same as Max with further customization for unique branding needs."
      },
      {
        title: "Content Marketing:",
        description: "8 social media posts per week for an aggressive content marketing strategy."
      }
    ]
  },
  {
    name: "GROWTH",
    color: "#41D52E",
    description: "The comprehensive solution for businesses aiming for significant online growth and lead generation.",
    features: [
      {
        title: "Website Creation, Domain, and Hosting (1 Year):",
        description: "Dynamic website with full back-end panel for lead management and CRM integration for 1 year. Includes domain, hosting, and strategic design."
      },
      {
        title: "Social Media Handling:",
        description: "Manage 5 social media accounts: Facebook, Instagram, Pinterest, YouTube, and LinkedIn with advanced strategies for brand positioning and growth."
      },
      {
        title: "Brand Growth Posts (Organic Followers):",
        description: "Same as Pro, with enhanced storytelling and engagement to maximize follower growth."
      },
      {
        title: "Website SEO Optimization:",
        description: "Comprehensive SEO strategy, including competitive analysis and ranking for 5+ keywords."
      },
      {
        title: "Keyword Research & Ranking:",
        description: "Same as Pro with additional focus on long-tail keywords and local SEO."
      },
      {
        title: "Video Posts for YouTube and Reels:",
        description: "Same as Pro with additional focus on trends and audience engagement."
      },
      {
        title: "Digital Access Creation:",
        description: "Comprehensive brand kit with all digital assets and on-demand customization."
      },
      {
        title: "Content Marketing:",
        description: "Same as Pro with high-quality content tailored to industry trends."
      },
      {
        title: "Lead Generation:",
        description: "200 qualified leads per month through targeted marketing campaigns."
      },
      {
        title: "Growth Strategy:",
        description: "Customized 10x growth strategy to position your brand in the industry."
      },
      {
        title: "Paid Social Media Marketing:",
        description: "Paid campaigns to rapidly grow followers and increase brand awareness."
      }
    ]
  }
];

// Helper component for plan card
const PlanCard = ({ plan }: { plan: typeof plans[0] }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      {/* Plan header */}
      <div 
        className="p-6 text-center text-white font-bold text-2xl"
        style={{ backgroundColor: plan.color }}
      >
        {plan.name}
      </div>
      
      {/* Plan features */}
      <div className="flex-grow p-6 space-y-4">
        <ul className="space-y-4 list-disc pl-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{feature.title}</span> {feature.description}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Plan footer */}
      <div className="p-6 bg-gray-50">
        <Button
          className="w-full py-4 text-white font-semibold text-lg"
          style={{ backgroundColor: '#FF6B00' }}
          onClick={() => {
            // Always redirect to home page contact section since we might be on a different page
            window.location.href = '/#contact';
          }}
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default function PlanComparison() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-[#FF6B00]">Growth Plan</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your business needs. All plans include dedicated support
            and regular performance reports.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Contact us for a personalized plan tailored to your specific requirements.
          </p>
          <Button 
            variant="outline"
            className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-all"
            onClick={() => {
              // Always redirect to home page contact section since we might be on a different page
              window.location.href = '/#contact';
            }}
          >
            Request Custom Plan
          </Button>
        </div>
      </div>
    </section>
  );
}