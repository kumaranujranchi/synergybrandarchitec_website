import { Building2, Utensils, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: "wishluv-buildcon",
      title: "Lead Generation Breakthrough in Patna's Real Estate Market",
      company: "Wishluv Buildcon",
      industry: "Real Estate",
      description: "How we generated 150+ qualified leads per month for a local property developer, transforming their business from offline to online.",
      icon: <Building2 className="h-8 w-8 text-white" />,
      iconBg: "bg-[#0066CC]",
      link: "/case-study/wishluv-buildcon"
    },
    {
      id: "biryani-mahal",
      title: "From Street Style to Premium Dining – Brand Transformation",
      company: "Biryani Mahal",
      industry: "Restaurant",
      description: "A complete brand makeover that increased footfall by 70% in just 45 days and transformed a local eatery into a premium dining destination.",
      icon: <Utensils className="h-8 w-8 text-white" />,
      iconBg: "bg-[#FF6B00]",
      link: "/case-study/biryani-mahal"
    },
    {
      id: "the-helping-hand",
      title: "Helping a Local Business Go Global – 200% Revenue Growth",
      company: "The Helping Hand",
      industry: "E-commerce",
      description: "Building a complete e-commerce system from scratch that helped a local handcraft business reach customers across India.",
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      iconBg: "bg-[#0066CC]",
      link: "/case-study/the-helping-hand"
    }
  ];

  return (
    <section id="case-studies" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real businesses, real results. See how we've helped companies like yours transform their digital presence 
            and achieve remarkable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <Card key={study.id} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex items-start mb-4 gap-3">
                  <div className={`p-2 rounded-lg ${study.iconBg}`}>
                    {study.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">{study.company}</h3>
                    <div className="text-sm text-gray-500">{study.industry}</div>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-3 text-gray-800">{study.title}</h4>
                <p className="text-gray-700">{study.description}</p>
              </CardContent>
              <CardFooter className="pt-0 pb-6">
                <Link to={study.link}>
                  <Button 
                    variant="outline" 
                    className="w-full text-[#0066CC] border-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-colors"
                  >
                    Read Case Study
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/#contact">
            <Button className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
              Want Similar Results? Contact Us Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}