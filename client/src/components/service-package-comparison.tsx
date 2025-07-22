import React, { useState } from 'react';
import { Check, X, Calendar, Users, PackageCheck, Layers, Wifi } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from 'wouter';
import { scrollToTop } from '@/lib/scrollHelper';

// Define package types
interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: {
    name: string;
    included: boolean;
    info?: string;
  }[];
  highlight?: boolean;
  cta?: string;
  frequency: string;
  popularFor: string[];
  icon: React.ReactNode;
}

// Feature categories for mobile responsive view
interface FeatureCategory {
  name: string;
  features: string[];
}

export default function ServicePackageComparison() {
  const [viewMode, setViewMode] = useState<'monthly' | 'quarterly'>('monthly');
  
  // Define feature categories for grouping in mobile view
  const featureCategories: FeatureCategory[] = [
    {
      name: "Strategy & Planning",
      features: [
        "Initial Marketing Audit",
        "Strategy Development",
        "Competitor Analysis",
        "Target Audience Identification",
        "Campaign Calendar"
      ]
    },
    {
      name: "Content Creation",
      features: [
        "Social Media Posts",
        "Content Articles",
        "Graphic Design",
        "Video Production",
        "Email Newsletter"
      ]
    },
    {
      name: "Digital Marketing",
      features: [
        "Social Media Management",
        "SEO Optimization",
        "Google Ads Management",
        "Email Marketing",
        "Analytics & Reporting"
      ]
    },
    {
      name: "Additional Services",
      features: [
        "Website Maintenance",
        "Consultation Calls",
        "Crisis Management",
        "Brand Style Guide",
        "Marketing Tool Access"
      ]
    }
  ];
  
  // Define service packages
  const monthlyPackages: ServicePackage[] = [
    {
      id: "starter",
      name: "Startup Package",
      price: "₹14,999",
      description: "Perfect for new businesses looking to establish an online presence.",
      frequency: "per month",
      popularFor: ["Small Businesses", "Startups", "Local Shops"],
      icon: <Wifi className="h-6 w-6 text-blue-500" />,
      features: [
        { name: "Initial Marketing Audit", included: false },
        { name: "Strategy Development", included: false },
        { name: "Competitor Analysis", included: false },
        { name: "Target Audience Identification", included: false },
        { name: "Campaign Calendar", included: false },
        { name: "Social Media Posts", included: true, info: "10 posts/month" },
        { name: "Content Articles", included: true, info: "1 article/month" },
        { name: "Graphic Design", included: true, info: "5 designs/month" },
        { name: "Video Production", included: false },
        { name: "Email Newsletter", included: false },
        { name: "Social Media Management", included: true, info: "2 platforms" },
        { name: "SEO Optimization", included: true, info: "Basic" },
        { name: "Google Ads Management", included: false },
        { name: "Email Marketing", included: false },
        { name: "Analytics & Reporting", included: true, info: "Monthly" },
        { name: "Website Maintenance", included: false },
        { name: "Consultation Calls", included: true, info: "1 call/month" },
        { name: "Crisis Management", included: false },
        { name: "Brand Style Guide", included: false },
        { name: "Marketing Tool Access", included: false }
      ],
      cta: "Get Started"
    },
    {
      id: "growth",
      name: "Growth Package",
      price: "₹29,999",
      description: "Designed for businesses ready to expand their digital footprint.",
      frequency: "per month",
      popularFor: ["Growing Businesses", "E-commerce", "Service Providers"],
      icon: <Layers className="h-6 w-6 text-indigo-500" />,
      highlight: true,
      features: [
        { name: "Initial Marketing Audit", included: true },
        { name: "Strategy Development", included: true },
        { name: "Competitor Analysis", included: true },
        { name: "Target Audience Identification", included: true },
        { name: "Campaign Calendar", included: true },
        { name: "Social Media Posts", included: true, info: "10 posts/month" },
        { name: "Content Articles", included: true, info: "2 articles/month" },
        { name: "Graphic Design", included: true, info: "5 designs/month" },
        { name: "Video Production", included: true, info: "1 video/month" },
        { name: "Email Newsletter", included: true, info: "2 newsletters/month" },
        { name: "Social Media Management", included: true, info: "4 platforms" },
        { name: "SEO Optimization", included: true, info: "Advanced" },
        { name: "Google Ads Management", included: true, info: "₹50,000 spend" },
        { name: "Email Marketing", included: true },
        { name: "Analytics & Reporting", included: true, info: "Bi-weekly" },
        { name: "Website Maintenance", included: true },
        { name: "Consultation Calls", included: true, info: "2 calls/month" },
        { name: "Crisis Management", included: false },
        { name: "Brand Style Guide", included: true },
        { name: "Marketing Tool Access", included: true }
      ],
      cta: "Most Popular"
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "₹49,999",
      description: "Comprehensive solution for established businesses seeking market dominance.",
      frequency: "per month",
      popularFor: ["Established Brands", "Corporations", "Multi-location Businesses"],
      icon: <PackageCheck className="h-6 w-6 text-green-500" />,
      features: [
        { name: "Initial Marketing Audit", included: true },
        { name: "Strategy Development", included: true },
        { name: "Competitor Analysis", included: true },
        { name: "Target Audience Identification", included: true },
        { name: "Campaign Calendar", included: true },
        { name: "Social Media Posts", included: true, info: "12 posts/month" },
        { name: "Content Articles", included: true, info: "4 articles/month" },
        { name: "Graphic Design", included: true, info: "7 designs/month" },
        { name: "Video Production", included: true, info: "3 videos/month" },
        { name: "Email Newsletter", included: true, info: "Weekly" },
        { name: "Social Media Management", included: true, info: "All platforms" },
        { name: "SEO Optimization", included: true, info: "Premium" },
        { name: "Google Ads Management", included: true, info: "₹100,000 spend" },
        { name: "Email Marketing", included: true, info: "Advanced automation" },
        { name: "Analytics & Reporting", included: true, info: "Weekly" },
        { name: "Website Maintenance", included: true, info: "Priority support" },
        { name: "Consultation Calls", included: true, info: "Weekly" },
        { name: "Crisis Management", included: true },
        { name: "Brand Style Guide", included: true, info: "Comprehensive" },
        { name: "Marketing Tool Access", included: true, info: "Premium tools" }
      ],
      cta: "Get Enterprise"
    }
  ];
  
  // Define quarterly packages (with discounted rates)
  const quarterlyPackages: ServicePackage[] = [
    {
      id: "starter-quarterly",
      name: "Startup Package",
      price: "₹11,999",
      description: "Perfect for new businesses looking to establish an online presence.",
      frequency: "per month, billed quarterly",
      popularFor: ["Small Businesses", "Startups", "Local Shops"],
      icon: <Wifi className="h-6 w-6 text-blue-500" />,
      features: monthlyPackages[0].features,
      cta: "Get Started"
    },
    {
      id: "growth-quarterly",
      name: "Growth Package",
      price: "₹23,999",
      description: "Designed for businesses ready to expand their digital footprint.",
      frequency: "per month, billed quarterly",
      popularFor: ["Growing Businesses", "E-commerce", "Service Providers"],
      icon: <Layers className="h-6 w-6 text-indigo-500" />,
      highlight: true,
      features: monthlyPackages[1].features,
      cta: "Most Popular"
    },
    {
      id: "premium-quarterly",
      name: "Premium Package",
      price: "₹39,999",
      description: "Comprehensive solution for established businesses seeking market dominance.",
      frequency: "per month, billed quarterly",
      popularFor: ["Established Brands", "Corporations", "Multi-location Businesses"],
      icon: <PackageCheck className="h-6 w-6 text-green-500" />,
      features: monthlyPackages[2].features,
      cta: "Get Enterprise"
    }
  ];
  
  // Get current packages based on view mode
  const currentPackages = viewMode === 'monthly' ? monthlyPackages : quarterlyPackages;

  return (
    <div className="w-full py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose the Right Package for Your Business</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare our service packages to find the perfect fit for your marketing needs. 
            All packages include dedicated support and are customizable to your specific goals.
          </p>
          
          {/* Commitment Notice */}
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              📝 Every plan requires at least a 1-year commitment, but payments can be made monthly.
            </p>
          </div>
          
          {/* Billing frequency toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 p-1 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-lg ${viewMode === 'monthly' ? 'bg-white shadow-sm text-[#FF6B00]' : 'text-gray-500'}`}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${viewMode === 'quarterly' ? 'bg-white shadow-sm text-[#FF6B00]' : 'text-gray-500'}`}
              onClick={() => setViewMode('quarterly')}
            >
              Quarterly <span className="text-xs text-green-600 font-medium">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Desktop comparison table */}
        <div className="hidden lg:block">
          <div className="relative overflow-x-auto rounded-xl border">
            <Table className="w-full text-sm">
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="py-4 text-gray-500 w-1/4">Features</TableHead>
                  {currentPackages.map((pkg) => (
                    <TableHead 
                      key={pkg.id} 
                      className={`text-center ${pkg.highlight ? 'bg-[#FF6B00]/5' : ''}`}
                    >
                      <div className="flex flex-col items-center p-4">
                        <div className="mb-2">{pkg.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                        <div className="mt-1 flex items-baseline justify-center">
                          <span className="text-2xl font-bold text-gray-900">{pkg.price}</span>
                          <span className="ml-1 text-sm text-gray-500">{pkg.frequency}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
                        <div className="mt-3">
                          <Badge variant={pkg.highlight ? "default" : "outline"} className={pkg.highlight ? "bg-[#FF6B00]" : ""}>
                            {pkg.cta}
                          </Badge>
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Feature Categories */}
                {featureCategories.map((category, categoryIndex) => (
                  <React.Fragment key={category.name}>
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={4} className="py-3 font-semibold text-gray-900">
                        {category.name}
                      </TableCell>
                    </TableRow>
                    
                    {/* Features in each category */}
                    {category.features.map((featureName) => {
                      const featureDetails = currentPackages.map(pkg => 
                        pkg.features.find(f => f.name === featureName)
                      );
                      
                      return (
                        <TableRow key={featureName} className="border-b hover:bg-gray-50">
                          <TableCell className="py-4 font-medium text-gray-900">
                            {featureName}
                          </TableCell>
                          
                          {featureDetails.map((feature, index) => (
                            <TableCell 
                              key={`${featureName}-${index}`} 
                              className={`text-center ${currentPackages[index].highlight ? 'bg-[#FF6B00]/5' : ''}`}
                            >
                              {feature?.included ? (
                                <div className="flex flex-col items-center justify-center">
                                  <div className="rounded-full bg-green-100 p-1 text-green-600 mb-1 mx-auto">
                                    <Check className="h-4 w-4" />
                                  </div>
                                  {feature.info && (
                                    <span className="text-xs text-gray-500">{feature.info}</span>
                                  )}
                                </div>
                              ) : (
                                <div className="rounded-full bg-gray-100 p-1 text-gray-400 mx-auto">
                                  <X className="h-4 w-4" />
                                </div>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}
                
                {/* CTA Row */}
                <TableRow>
                  <TableCell className=""></TableCell>
                  {currentPackages.map((pkg) => (
                    <TableCell key={`cta-${pkg.id}`} className={`text-center p-4 ${pkg.highlight ? 'bg-[#FF6B00]/5' : ''}`}>
                      <Link href="/#contact" onClick={() => scrollToTop()}>
                        <Button 
                          className={`w-full ${pkg.highlight ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                        >
                          Get Started
                        </Button>
                      </Link>
                      <div className="mt-2 text-xs text-gray-500">
                        No credit card required
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Mobile view - cards */}
        <div className="lg:hidden">
          <Tabs defaultValue="starter" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-3">
              <TabsTrigger value="starter">Startup</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
            
            {currentPackages.map((pkg) => (
              <TabsContent key={pkg.id} value={pkg.id.split('-')[0]} className="mt-4">
                <div className={`rounded-xl border p-6 ${pkg.highlight ? 'border-[#FF6B00] bg-[#FF6B00]/5' : ''}`}>
                  <div className="mb-4 flex items-center">
                    <div className={`p-2 rounded-md ${pkg.highlight ? 'bg-[#FF6B00]/20' : 'bg-gray-100'}`}>
                      {pkg.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{pkg.price}</span>
                        <span className="ml-1 text-sm text-gray-500">{pkg.frequency}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-gray-600">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Popular for:</div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.popularFor.map((item, i) => (
                        <Badge key={i} variant="secondary" className="font-normal">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/#contact" onClick={() => scrollToTop()}>
                    <Button className={`w-full ${pkg.highlight ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90' : ''}`}>
                      Get Started
                    </Button>
                  </Link>
                  
                  <div className="mt-6">
                    <div className="text-sm font-medium mb-2">What's included:</div>
                    <div className="space-y-3">
                      {pkg.features
                        .filter(f => f.included)
                        .map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="rounded-full bg-green-100 p-1 text-green-600 mr-2 mt-0.5">
                              <Check className="h-3 w-3" />
                            </div>
                            <div>
                              <span className="text-sm">{feature.name}</span>
                              {feature.info && (
                                <span className="text-xs text-gray-500 block">{feature.info}</span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="text-sm font-medium mb-2">Not included:</div>
                    <div className="space-y-2">
                      {pkg.features
                        .filter(f => !f.included)
                        .map((feature, i) => (
                          <div key={i} className="flex items-center">
                            <div className="rounded-full bg-gray-100 p-1 text-gray-400 mr-2">
                              <X className="h-3 w-3" />
                            </div>
                            <span className="text-sm text-gray-500">{feature.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-2">Need a customized solution?</h3>
          <p className="text-gray-600 mb-6">
            Contact us for a personalized marketing strategy tailored to your specific business needs.
          </p>
          <Link href="/#contact" onClick={() => scrollToTop()}>
            <Button variant="outline" className="border-[#FF6B00] text-[#FF6B00]">
              Contact Us For Custom Pricing
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-lg mb-2">Can I switch between packages?</h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your package at any time. Changes will be effective from the next billing cycle.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Is there a minimum contract period?</h4>
              <p className="text-gray-600">
                Our monthly packages have no minimum commitment. Quarterly packages require a 3-month commitment.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Can I customize my package?</h4>
              <p className="text-gray-600">
                Absolutely! Contact us to customize any package to fit your specific business needs.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">Do you offer refunds?</h4>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee if you're not satisfied with our services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}