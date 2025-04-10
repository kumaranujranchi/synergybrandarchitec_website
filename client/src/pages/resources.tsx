import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ArrowRight, CheckCheck, BarChart4, Calculator, Lightbulb, Trophy, Calendar, Target, Settings } from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  return (
    <div className="flex flex-col min-h-screen font-inter text-[#333333] bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#FF6B00]/5 to-[#0066CC]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Marketing <span className="text-[#FF6B00]">Resources</span> & Tools
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Discover practical tools, case studies, and resources to help grow your business and strengthen your brand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#free-tools" className="inline-block">
                <Button className="bg-[#0066CC] hover:bg-[#0055AA] text-white text-lg px-6 py-6 rounded-lg">
                  Explore Free Tools
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#case-studies" className="inline-block">
                <Button variant="outline" className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10 text-lg px-6 py-6 rounded-lg">
                  View Case Studies
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Free Tools Section */}
      <section id="free-tools" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 font-poppins">Free Marketing Tools</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl">
                Practical tools to help you make smarter marketing decisions and plan more effective campaigns.
              </p>
            </div>
            
            <Tabs defaultValue="roi-calculator" className="w-full">
              <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 mb-8">
                <TabsTrigger value="roi-calculator" className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white">
                  ROI Calculator
                </TabsTrigger>
                <TabsTrigger value="marketing-budget" className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white">
                  Budget Planner
                </TabsTrigger>
                <TabsTrigger value="campaign-planner" className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white">
                  Campaign Planner
                </TabsTrigger>
              </TabsList>
              
              {/* ROI Calculator */}
              <TabsContent value="roi-calculator">
                <ROICalculator />
              </TabsContent>
              
              {/* Marketing Budget Planner */}
              <TabsContent value="marketing-budget">
                <MarketingBudgetPlanner />
              </TabsContent>
              
              {/* Campaign Planner */}
              <TabsContent value="campaign-planner">
                <CampaignPlanner />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 font-poppins">Case Studies</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#FF6B00] to-[#0066CC] mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl">
                Discover how we've helped businesses grow through strategic marketing and branding solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Wishluv Buildcon Case Study */}
              <CaseStudyCard 
                title="Wishluv Buildcon"
                category="Real Estate"
                location="Patna"
                serviceType="Lead Generation & Digital Transformation"
                description="How we helped a local real estate developer generate 120+ qualified leads within 45 days through strategic digital marketing."
                icon={<Trophy className="w-8 h-8 text-[#FF6B00]" />}
                stats={[
                  { label: "Leads Generated", value: "120+" },
                  { label: "ROI", value: "430%" },
                  { label: "Timeframe", value: "45 days" }
                ]}
                slug="wishluv-buildcon"
              />
              
              {/* Biryani Mahal Case Study */}
              <CaseStudyCard 
                title="Biryani Mahal"
                category="Restaurant"
                location="Patna"
                serviceType="Brand Identity & Social Media"
                description="Transforming a local restaurant into a recognizable brand with strong social media presence and 200% increase in online orders."
                icon={<BarChart4 className="w-8 h-8 text-[#FF6B00]" />}
                stats={[
                  { label: "Social Growth", value: "300%" },
                  { label: "Order Increase", value: "200%" },
                  { label: "Timeframe", value: "3 months" }
                ]}
                slug="biryani-mahal"
              />
              
              {/* The Helping Hand Case Study */}
              <CaseStudyCard 
                title="The Helping Hand"
                category="Non-Profit"
                location="Bihar"
                serviceType="Website & Digital Presence"
                description="Creating a digital presence for a local NGO that increased donations by 150% and volunteer applications by 200%."
                icon={<Target className="w-8 h-8 text-[#FF6B00]" />}
                stats={[
                  { label: "Donation Increase", value: "150%" },
                  { label: "Volunteer Growth", value: "200%" },
                  { label: "Timeframe", value: "6 months" }
                ]}
                slug="the-helping-hand"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#004999]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a custom strategy designed for your business goals and budget
            </p>
            <div>
              <a href="/#contact">
                <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-6 px-8 rounded-lg transition-all hover:shadow-lg text-lg">
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}

// ROI Calculator Component
function ROICalculator() {
  const [marketingSpend, setMarketingSpend] = useState<number>(50000);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(2000);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Calculated values
  const expectedVisitors = marketingSpend * 0.5; // Assume ₹2 per visitor
  const expectedConversions = Math.round(expectedVisitors * (conversionRate / 100));
  const expectedRevenue = expectedConversions * avgOrderValue;
  const roi = ((expectedRevenue - marketingSpend) / marketingSpend) * 100;
  
  const handleCalculate = () => {
    setShowResults(true);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6B00]/10 p-3 rounded-full">
          <Calculator className="w-6 h-6 text-[#FF6B00]" />
        </div>
        <h3 className="text-2xl font-semibold">Digital Marketing ROI Calculator</h3>
      </div>
      
      <p className="text-gray-600 mb-8">
        Estimate the return on investment for your digital marketing campaigns.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="marketing-spend" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Marketing Budget (₹)
              </Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="marketing-spend"
                  type="number" 
                  value={marketingSpend} 
                  onChange={(e) => setMarketingSpend(parseInt(e.target.value) || 0)}
                  className="w-full" 
                />
              </div>
              <div className="mt-2">
                <Slider 
                  value={[marketingSpend]} 
                  onValueChange={(value) => setMarketingSpend(value[0])} 
                  step={5000}
                  min={10000}
                  max={500000}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹10,000</span>
                  <span>₹500,000</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="conversion-rate" className="block text-sm font-medium text-gray-700 mb-1">
                Conversion Rate (%)
              </Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="conversion-rate"
                  type="number" 
                  value={conversionRate} 
                  onChange={(e) => setConversionRate(parseFloat(e.target.value) || 0)}
                  className="w-full" 
                  step="0.1"
                />
              </div>
              <div className="mt-2">
                <Slider 
                  value={[conversionRate]} 
                  onValueChange={(value) => setConversionRate(value[0])} 
                  step={0.1}
                  min={0.1}
                  max={10}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.1%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="avg-order-value" className="block text-sm font-medium text-gray-700 mb-1">
                Average Order Value (₹)
              </Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="avg-order-value"
                  type="number" 
                  value={avgOrderValue} 
                  onChange={(e) => setAvgOrderValue(parseInt(e.target.value) || 0)}
                  className="w-full" 
                />
              </div>
              <div className="mt-2">
                <Slider 
                  value={[avgOrderValue]} 
                  onValueChange={(value) => setAvgOrderValue(value[0])} 
                  step={500}
                  min={500}
                  max={10000}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹10,000</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-5"
              onClick={handleCalculate}
            >
              Calculate ROI
            </Button>
          </div>
        </div>
        
        <div>
          {showResults ? (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
              <h4 className="text-lg font-semibold mb-4 text-[#0066CC]">Your Estimated Results</h4>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500">Estimated Visitors</p>
                    <p className="text-2xl font-bold text-[#333]">{expectedVisitors.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500">Potential Customers</p>
                    <p className="text-2xl font-bold text-[#333]">{expectedConversions.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">Projected Revenue</p>
                  <p className="text-2xl font-bold text-[#333]">₹{expectedRevenue.toLocaleString()}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">Return on Investment</p>
                  <p className="text-2xl font-bold text-[#FF6B00]">{roi.toFixed(0)}%</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Want a customized marketing strategy to achieve these results or better?
                  </p>
                  <a href="/#contact">
                    <Button variant="outline" className="mt-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC]/5 w-full">
                      Book a Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center items-center h-full">
              <div className="text-center">
                <Calculator className="w-12 h-12 text-[#0066CC]/30 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2 text-gray-600">Your Results Will Appear Here</h4>
                <p className="text-gray-500 text-sm">
                  Adjust the sliders on the left and click "Calculate ROI" to see your projected results.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Marketing Budget Planner Component
function MarketingBudgetPlanner() {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(500000);
  const [industryType, setIndustryType] = useState<string>("retail");
  const [growthGoal, setGrowthGoal] = useState<string>("moderate");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Industry percentages (marketing budget as % of revenue)
  const industryPercentages: Record<string, number> = {
    retail: 4,
    technology: 12,
    healthcare: 8,
    manufacturing: 6,
    education: 10,
    restaurant: 3,
    ecommerce: 15,
    professional: 5,
    other: 8,
  };
  
  // Growth multipliers for budget allocation
  const growthMultipliers: Record<string, number> = {
    minimal: 0.7,
    moderate: 1.0,
    aggressive: 1.3,
  };
  
  // Calculate budget
  const calculateBudget = () => {
    const basePercentage = industryPercentages[industryType];
    const multiplier = growthMultipliers[growthGoal];
    return monthlyRevenue * (basePercentage / 100) * multiplier;
  };
  
  // Calculate channel allocations
  const calculateAllocations = (totalBudget: number) => {
    // Different industries have different optimal allocations
    const channelAllocations: Record<string, Record<string, number>> = {
      retail: { social: 0.25, search: 0.20, display: 0.15, content: 0.15, email: 0.15, other: 0.10 },
      technology: { social: 0.15, search: 0.30, display: 0.15, content: 0.25, email: 0.10, other: 0.05 },
      healthcare: { social: 0.15, search: 0.25, display: 0.10, content: 0.30, email: 0.10, other: 0.10 },
      manufacturing: { social: 0.10, search: 0.25, display: 0.15, content: 0.20, email: 0.15, other: 0.15 },
      education: { social: 0.25, search: 0.20, display: 0.15, content: 0.25, email: 0.10, other: 0.05 },
      restaurant: { social: 0.40, search: 0.20, display: 0.15, content: 0.10, email: 0.10, other: 0.05 },
      ecommerce: { social: 0.20, search: 0.30, display: 0.20, content: 0.10, email: 0.15, other: 0.05 },
      professional: { social: 0.15, search: 0.25, display: 0.10, content: 0.30, email: 0.15, other: 0.05 },
      other: { social: 0.20, search: 0.25, display: 0.15, content: 0.20, email: 0.15, other: 0.05 },
    };
    
    const allocations = channelAllocations[industryType];
    return {
      social: Math.round(totalBudget * allocations.social),
      search: Math.round(totalBudget * allocations.search),
      display: Math.round(totalBudget * allocations.display),
      content: Math.round(totalBudget * allocations.content),
      email: Math.round(totalBudget * allocations.email),
      other: Math.round(totalBudget * allocations.other)
    };
  };
  
  // Calculate the budget
  const budget = calculateBudget();
  const allocations = calculateAllocations(budget);
  
  // Handle planning
  const handlePlan = () => {
    setShowResults(true);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6B00]/10 p-3 rounded-full">
          <Target className="w-6 h-6 text-[#FF6B00]" />
        </div>
        <h3 className="text-2xl font-semibold">Marketing Budget Planner</h3>
      </div>
      
      <p className="text-gray-600 mb-8">
        Get a customized marketing budget recommendation based on your industry and growth goals.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="monthly-revenue" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Revenue (₹)
              </Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="monthly-revenue"
                  type="number" 
                  value={monthlyRevenue} 
                  onChange={(e) => setMonthlyRevenue(parseInt(e.target.value) || 0)}
                  className="w-full" 
                />
              </div>
              <div className="mt-2">
                <Slider 
                  value={[monthlyRevenue]} 
                  onValueChange={(value) => setMonthlyRevenue(value[0])} 
                  step={50000}
                  min={100000}
                  max={5000000}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹50 Lakhs</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </Label>
              <Select value={industryType} onValueChange={setIndustryType}>
                <SelectTrigger id="industry" className="w-full">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail / Physical Store</SelectItem>
                  <SelectItem value="technology">Technology / SaaS</SelectItem>
                  <SelectItem value="healthcare">Healthcare / Medical</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education / Training</SelectItem>
                  <SelectItem value="restaurant">Restaurant / Food Service</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="professional">Professional Services</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="growth-goal" className="block text-sm font-medium text-gray-700 mb-1">
                Growth Goal
              </Label>
              <Select value={growthGoal} onValueChange={setGrowthGoal}>
                <SelectTrigger id="growth-goal" className="w-full">
                  <SelectValue placeholder="Select your growth goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal Growth (~10% yearly)</SelectItem>
                  <SelectItem value="moderate">Moderate Growth (~25% yearly)</SelectItem>
                  <SelectItem value="aggressive">Aggressive Growth (50%+ yearly)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-5"
              onClick={handlePlan}
            >
              Get Budget Plan
            </Button>
          </div>
        </div>
        
        <div>
          {showResults ? (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
              <h4 className="text-lg font-semibold mb-4 text-[#0066CC]">Your Recommended Budget</h4>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">Monthly Marketing Budget</p>
                  <p className="text-2xl font-bold text-[#FF6B00]">₹{Math.round(budget).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    (~{industryPercentages[industryType] * growthMultipliers[growthGoal]}{industryPercentages[industryType] * growthMultipliers[growthGoal] % 1 ? "" : ".0"}% of monthly revenue)
                  </p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-3 text-gray-700">Recommended Channel Allocation</h5>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social Media Marketing</span>
                      <span className="text-sm font-medium">₹{allocations.social.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#FF6B00] h-1.5 rounded-full" style={{ width: `${allocations.social / budget * 100}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Search Engine Marketing</span>
                      <span className="text-sm font-medium">₹{allocations.search.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#0066CC] h-1.5 rounded-full" style={{ width: `${allocations.search / budget * 100}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Display / Banner Ads</span>
                      <span className="text-sm font-medium">₹{allocations.display.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#FF6B00]/70 h-1.5 rounded-full" style={{ width: `${allocations.display / budget * 100}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Marketing</span>
                      <span className="text-sm font-medium">₹{allocations.content.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#0066CC]/70 h-1.5 rounded-full" style={{ width: `${allocations.content / budget * 100}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Marketing</span>
                      <span className="text-sm font-medium">₹{allocations.email.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#FF6B00]/40 h-1.5 rounded-full" style={{ width: `${allocations.email / budget * 100}%` }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other Channels</span>
                      <span className="text-sm font-medium">₹{allocations.other.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-[#0066CC]/40 h-1.5 rounded-full" style={{ width: `${allocations.other / budget * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Want expert help to optimize your marketing budget allocation?
                  </p>
                  <a href="/#contact">
                    <Button variant="outline" className="mt-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC]/5 w-full">
                      Get a Custom Strategy
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center items-center h-full">
              <div className="text-center">
                <Target className="w-12 h-12 text-[#0066CC]/30 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2 text-gray-600">Your Budget Plan Will Appear Here</h4>
                <p className="text-gray-500 text-sm">
                  Fill in your information on the left and click "Get Budget Plan" to see your customized recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Campaign Planner Component
function CampaignPlanner() {
  const [businessType, setBusinessType] = useState<string>("retail");
  const [campaignGoal, setCampaignGoal] = useState<string>("awareness");
  const [targetAudience, setTargetAudience] = useState<string>("general");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Campaign ideas based on business type, goal, and audience
  const getCampaignIdeas = () => {
    // This would typically be a much larger database of ideas
    const campaignIdeas: Record<string, Record<string, Record<string, string[]>>> = {
      retail: {
        awareness: {
          general: [
            "Seasonal Pop-up Event at Popular Location",
            "Local Influencer Partnership Campaign",
            "User-Generated Content Contest with Product Giveaways"
          ],
          youth: [
            "TikTok/Instagram Reels Challenge with Store Products",
            "Campus Ambassador Program with Student Discounts",
            "Interactive Store Scavenger Hunt with Prizes"
          ],
          professional: [
            "Professional Networking Event with Product Showcases",
            "Value-Based Content Series on Professional Social Media",
            "Exclusive Professional Early-Access Shopping Event"
          ]
        },
        conversion: {
          general: [
            "Limited-Time Bundle Offers with Countdown Timer",
            "Abandoned Cart Recovery with Progressive Discounts",
            "Personalized Product Recommendation Email Series"
          ],
          youth: [
            "Flash Sale Announcements via Instagram/Snapchat",
            "Student Discount Program with ID Verification",
            "Buy-Now-Pay-Later Options Promotion"
          ],
          professional: [
            "Office/Team Package Deals with Bulk Discounts",
            "Professional Referral Program with Business Incentives",
            "B2B Subscription Model for Regular Purchases"
          ]
        },
        retention: {
          general: [
            "Tiered Loyalty Program with Exclusive Benefits",
            "Customer Appreciation Events with VIP Access",
            "Personalized Anniversary Discounts Based on First Purchase"
          ],
          youth: [
            "Points-Based Rewards System with Digital Badges/Achievements",
            "Exclusive Youth Community with Special Access",
            "Friend Referral Program with Double Rewards"
          ],
          professional: [
            "Annual Subscription Model with Priority Access",
            "Professional Development Workshops Related to Products",
            "Executive Membership with Premium Services"
          ]
        }
      },
      service: {
        awareness: {
          general: [
            "Free Value-Based Webinar Series",
            "Service Demo Videos on Social Media",
            "Informative Infographic Campaign on Common Industry Problems"
          ],
          youth: [
            "Campus/College Workshop Program",
            "Youth-Focused Problem-Solution Social Media Campaign",
            "Service Trial Program for Student Organizations"
          ],
          professional: [
            "Industry White Paper Distribution Campaign",
            "Professional Conference Sponsorship",
            "LinkedIn Article Series on Industry Challenges"
          ]
        },
        conversion: {
          general: [
            "Free Consultation with Service Audit",
            "Limited-Time Service Package Discount",
            "Problem-Specific Landing Pages with Solution Offerings"
          ],
          youth: [
            "Entry-Level Service Package for Young Professionals",
            "Career-Growth Focused Service Messaging",
            "Skill Development Package with Certification"
          ],
          professional: [
            "ROI Calculator for Service Benefits",
            "Industry-Specific Case Study Campaign",
            "Competitive Analysis Offer as Lead Magnet"
          ]
        },
        retention: {
          general: [
            "Service Upgrade Pathway with Loyalty Pricing",
            "Regular Client Success Check-In Program",
            "Exclusive Content Access for Existing Clients"
          ],
          youth: [
            "Career Progress Milestone Celebrations",
            "Young Professional Network Access",
            "Skill Growth Path with Progressive Services"
          ],
          professional: [
            "Annual Service Review with Optimization Recommendations",
            "Client Advisory Board Invitation for Long-Term Clients",
            "Industry Insider Events Exclusive to Clients"
          ]
        }
      },
      restaurant: {
        awareness: {
          general: [
            "Signature Dish Photo Campaign on Instagram",
            "Chef's Story Video Series on Social Media",
            "Local Food Blogger Collaboration Event"
          ],
          youth: [
            "Student Meal Deal Social Media Campaign",
            "TikTok Food Challenge with Restaurant Items",
            "Late-Night Study Hours with Special Menu"
          ],
          professional: [
            "Business Lunch Express Menu Promotion",
            "Corporate Catering Showcase Event",
            "Professional Networking Breakfast Series"
          ]
        },
        conversion: {
          general: [
            "First-Time Visitor Welcome Discount",
            "Limited-Time Menu Item with Countdown",
            "Meal-for-Two Special Offers Campaign"
          ],
          youth: [
            "Student ID Happy Hour Special",
            "Campus Food Delivery with Group Discounts",
            "Social Media Check-In Offer for Students"
          ],
          professional: [
            "Business Meeting Package with Private Space",
            "Corporate Loyalty Program with Digital Payments",
            "Executive Lunch Membership Program"
          ]
        },
        retention: {
          general: [
            "Birthday Month Free Dessert Program",
            "Frequency Rewards Card (Digital or Physical)",
            "Chef's Table Experience for Regular Customers"
          ],
          youth: [
            "Semester Survival Package Deals",
            "Student Ambassador Program with Free Meals",
            "Exam Week Special Support Menu"
          ],
          professional: [
            "Corporate Account Program with Invoicing",
            "Business Event Catering with Regular Client Discount",
            "Workspace Lunch Delivery Subscription"
          ]
        }
      },
      ecommerce: {
        awareness: {
          general: [
            "Lifestyle Product Usage Video Series",
            "User-Generated Content Contest with Hashtag",
            "Pinterest/Instagram Shopping Campaign"
          ],
          youth: [
            "Unboxing Campaign with Young Influencers",
            "Campus Brand Ambassador Program",
            "Platform-Specific Youth Trends Campaign (TikTok, etc.)"
          ],
          professional: [
            "LinkedIn Product Use Case Campaign",
            "Professional Problem-Solution Ad Series",
            "Industry Showcase Partnership"
          ]
        },
        conversion: {
          general: [
            "Exit-Intent Popup with First Purchase Discount",
            "Free Shipping Threshold Strategy",
            "Abandoned Cart Email Sequence with Incentives"
          ],
          youth: [
            "Student Verification Discount Program",
            "Buy Now Pay Later Option Promotion",
            "Social Shopping Party with Live Discounts"
          ],
          professional: [
            "Business Account Benefits Program",
            "Professional Use Case ROI Calculator",
            "Bulk Purchase Discount Structure"
          ]
        },
        retention: {
          general: [
            "VIP Early Access to New Products/Sales",
            "Point-Based Loyalty Program with Tiers",
            "Personalized Product Recommendation Engine"
          ],
          youth: [
            "Exclusive Youth Community Membership",
            "Social Sharing Rewards Program",
            "Subscription Box Option with Customization"
          ],
          professional: [
            "Professional Reorder Automation Program",
            "Business Account Management Portal",
            "Annual Usage Review with Personalized Offers"
          ]
        }
      }
    };
    
    // Default to retail/awareness/general if combination doesn't exist
    if (!campaignIdeas[businessType] || 
        !campaignIdeas[businessType][campaignGoal] || 
        !campaignIdeas[businessType][campaignGoal][targetAudience]) {
      return campaignIdeas.retail.awareness.general;
    }
    
    return campaignIdeas[businessType][campaignGoal][targetAudience];
  };
  
  // Get campaign ideas
  const campaignIdeas = getCampaignIdeas();
  
  // Channel recommendations based on business, goal and audience
  const getChannelRecommendations = () => {
    // For simplicity, we'll just return a fixed set for now
    const primary = campaignGoal === "awareness" 
      ? ["Instagram", "Facebook", "YouTube"]
      : campaignGoal === "conversion" 
        ? ["Google Ads", "Facebook Ads", "Email Marketing"]
        : ["Email Marketing", "SMS", "WhatsApp Business"];
        
    const secondary = targetAudience === "youth"
      ? ["TikTok", "Instagram Stories", "Snapchat"]
      : targetAudience === "professional"
        ? ["LinkedIn", "Twitter", "Industry Publications"]
        : ["Facebook", "Google Display Network", "Local Partnerships"];
        
    return { primary, secondary };
  };
  
  const channelRecommendations = getChannelRecommendations();
  
  // Timeline recommendation based on campaign goal
  const getTimelineRecommendation = () => {
    switch(campaignGoal) {
      case "awareness": 
        return "2-3 months (with at least 2 weeks of preparation)";
      case "conversion": 
        return "1-2 months (with 1 week of preparation)";
      case "retention": 
        return "Ongoing (3-6 month cycles with regular optimization)";
      default:
        return "2-3 months";
    }
  };
  
  const timeline = getTimelineRecommendation();
  
  // Handle planning
  const handleCreate = () => {
    setShowResults(true);
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6B00]/10 p-3 rounded-full">
          <Calendar className="w-6 h-6 text-[#FF6B00]" />
        </div>
        <h3 className="text-2xl font-semibold">Marketing Campaign Planner</h3>
      </div>
      
      <p className="text-gray-600 mb-8">
        Get customized campaign ideas based on your business type and marketing goals.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="business-type" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger id="business-type" className="w-full">
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail / Physical Store</SelectItem>
                  <SelectItem value="service">Service Business</SelectItem>
                  <SelectItem value="restaurant">Restaurant / Food Service</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="campaign-goal" className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Goal
              </Label>
              <Select value={campaignGoal} onValueChange={setCampaignGoal}>
                <SelectTrigger id="campaign-goal" className="w-full">
                  <SelectValue placeholder="Select your campaign goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness & Reach</SelectItem>
                  <SelectItem value="conversion">Conversions & Sales</SelectItem>
                  <SelectItem value="retention">Customer Retention & Loyalty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="target-audience" className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger id="target-audience" className="w-full">
                  <SelectValue placeholder="Select your target audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Audience</SelectItem>
                  <SelectItem value="youth">Youth / Students (18-25)</SelectItem>
                  <SelectItem value="professional">Business Professionals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full bg-[#FF6B00] hover:bg-[#FF8533] text-white py-5"
              onClick={handleCreate}
            >
              Generate Campaign Ideas
            </Button>
          </div>
        </div>
        
        <div>
          {showResults ? (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
              <h4 className="text-lg font-semibold mb-4 text-[#0066CC]">Your Campaign Ideas</h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="text-sm font-medium mb-3 text-gray-700">Campaign Concepts</h5>
                  
                  <div className="space-y-3">
                    {campaignIdeas.map((idea, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="flex items-start gap-2">
                          <div className="bg-[#FF6B00]/10 p-1 rounded-full mt-0.5">
                            <Lightbulb className="text-[#FF6B00] w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{idea}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-3 text-gray-700">Recommended Channels</h5>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Primary Channels</p>
                      <ul className="space-y-2">
                        {channelRecommendations.primary.map((channel, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCheck className="text-[#FF6B00] w-4 h-4" />
                            <span className="text-sm">{channel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Secondary Channels</p>
                      <ul className="space-y-2">
                        {channelRecommendations.secondary.map((channel, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCheck className="text-[#0066CC] w-4 h-4" />
                            <span className="text-sm">{channel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Recommended Timeline</p>
                  <p className="font-medium">{timeline}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Want help implementing these campaign ideas with professional execution?
                  </p>
                  <a href="/#contact">
                    <Button variant="outline" className="mt-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC]/5 w-full">
                      Discuss Your Campaign
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col justify-center items-center h-full">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-[#0066CC]/30 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2 text-gray-600">Your Campaign Ideas Will Appear Here</h4>
                <p className="text-gray-500 text-sm">
                  Complete the form on the left and click "Generate Campaign Ideas" to see your customized marketing campaign suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Case Study Card Component
function CaseStudyCard({ 
  title, 
  category, 
  location,
  serviceType,
  description, 
  icon, 
  stats, 
  slug 
}: { 
  title: string;
  category: string;
  location: string;
  serviceType: string;
  description: string;
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
  slug: string;
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="px-2 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-medium inline-block mb-2">
              {category}
            </div>
            <CardTitle className="text-xl mb-1">{title}</CardTitle>
            <CardDescription className="text-gray-500">
              {location} • {serviceType}
            </CardDescription>
          </div>
          <div className="bg-[#0066CC]/5 p-2 rounded-full">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-[#FF6B00] font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/case-studies/${slug}`} className="w-full">
          <Button variant="outline" className="w-full border-[#0066CC] text-[#0066CC]">
            Read Full Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}