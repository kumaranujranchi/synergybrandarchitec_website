import { Link } from "wouter";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";
import Header from "@/components/header";
import Footer from "@/components/footer";

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 mb-4">
    <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5 mt-1" />
    <span>{text}</span>
  </div>
);

export default function StartupPlan() {
  return (
    <div className="pt-24 font-inter text-[#333333]">
      {/* Include Header and Footer components */}
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6B00]/10 to-[#0066CC]/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#FF6B00] font-poppins">🇮🇳 Ab Indian Banega Fully Digital</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl">
              A Special Initiative to Empower Small Businesses with Affordable, Professional Websites
            </p>
            <p className="text-lg max-w-3xl mb-10 text-gray-700">
              In today's digital age, having a website is no longer a luxury — it's a necessity. 
              Yet, for many small businesses and first-time entrepreneurs, going online can seem 
              confusing, expensive, or overwhelming. That's where our initiative comes in.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#contact');
              }}>
                <Button className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
                  Book a Free Consultation
                </Button>
              </a>
              <a href="#pricing">
                <Button variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md text-lg">
                  View Package Details
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About The Initiative */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">What Is This Initiative All About?</h2>
            <p className="text-lg mb-8">
              At Synergy Brand Architect, we believe that every Indian business — no matter how big or small — 
              deserves to shine online. Whether you run a local shop, are launching a startup, or just want to 
              take your traditional business digital, this initiative is made for you.
            </p>
            <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#0066CC]">
                We are offering a fully developed, custom-coded website built on industry-standard technologies – 
                React.js, Node.js, and Express.js – at a super affordable cost of just ₹15,000.
              </h3>
              <p className="text-lg mb-6">Unlike DIY website builders or outdated templates, you get:</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>100% custom code</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>Optimized for speed, security, and scalability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#FF6B00] min-w-5 h-5" />
                  <span>No bloated code, no dependency on platforms like WordPress, Wix, Webflow, or Weebly</span>
                </li>
              </ul>
              <p className="text-lg mt-6">
                This isn't a stripped-down version. It's the real deal – a professional-grade website at a price 
                any growing business can afford.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center font-poppins">Perfect For:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Small shops & local vendors",
              "Service providers (salons, tutors, freelancers, repairmen, consultants)",
              "First-time business owners",
              "Home-based businesses going online",
              "NGOs & community-driven groups",
              "Local brands looking to stand out"
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-start gap-3">
                <div className="bg-[#FF6B00]/10 p-2 rounded-full">
                  <CheckCircle2 className="text-[#FF6B00] w-6 h-6" />
                </div>
                <div className="text-lg">{item}</div>
              </div>
            ))}
          </div>
          <p className="text-lg text-center mt-10 max-w-3xl mx-auto">
            We want to digitally empower every corner of India, and we're starting with those who need it the most — YOU.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center font-poppins">What's Included in ₹15,000</h2>
          <p className="text-center mb-12 text-lg">Here's what you get as part of this special package:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Custom Website Development</h3>
              <p>Your website will be built from scratch, specifically for your business — no templates, no generic designs.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Content Writing for Website</h3>
              <p>We'll write clear, compelling content tailored for your products/services to attract and convert visitors.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Professional Logo Design</h3>
              <p>Don't have a logo yet? No problem! We'll design a unique and memorable logo that reflects your brand identity.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Stock Images & Videos</h3>
              <p>We'll use relevant, high-quality images and videos to make your site visually appealing and modern.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Responsive Design</h3>
              <p>Your site will work perfectly across mobile, tablet, and desktop — ensuring a smooth user experience.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Built on Popular Tech Stack</h3>
              <p>React JS + Node JS + Express = Fast, reliable, scalable — just like top websites worldwide.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Basic SEO Setup</h3>
              <p>We ensure the code and structure are SEO-ready so that you can start ranking on Google from Day 1.</p>
            </div>
            
            <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-xl mb-4 text-[#0066CC]">Free Consultation</h3>
              <p>Get expert advice on how big you can grow, and what digital solutions make sense for your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center font-poppins">Additional Options</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">Want It Faster?</h3>
              <p className="text-lg mb-4">
                Add Fast Delivery (within 72 hours) for just ₹6,999 extra and get your site live in no time.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-10">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">Need the Source Code?</h3>
              <p className="text-lg mb-4">
                We'll provide the complete project source files if you want to manage it yourself or with a developer.
              </p>
              <p className="text-lg italic">
                ✅ On-demand option (Charged based on website size & structure)
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-[#FF6B00]">What's Not Included (But We'll Help You Set It Up)</h3>
              <p className="text-lg mb-4">
                <span className="text-red-500">❌</span> Domain name (we'll guide you to buy the right one)<br />
                <span className="text-red-500">❌</span> Hosting (we'll recommend best options suited for your needs)
              </p>
              <p className="text-lg">
                These costs are not included in the ₹15,000 package, but we'll assist you step-by-step in setting them up – no tech knowledge needed!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Doing This */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Why Are We Doing This?</h2>
            <p className="text-lg mb-6">
              We've seen hundreds of amazing businesses with great products and passionate founders — struggling 
              to grow because they lack digital presence. Big agencies are too expensive, and DIY builders 
              aren't scalable or professional.
            </p>
            <p className="text-lg mb-6">
              So, we decided to bridge that gap.
            </p>
            <p className="text-xl font-semibold text-center mb-6">
              This initiative is not about profit — it's about purpose.
            </p>
            <p className="text-lg text-center">
              We're here to level the playing field, ensuring every small business in India has the tools 
              to compete and grow in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Bonus Add-ons */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center font-poppins">Bonus Add-ons (Available on Request)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">App Design Linked to Website</h3>
              <p>Want your customers to use your service via a mobile app? We can do that too.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">Dashboard Integration</h3>
              <p>For future scalability (manage leads, users, etc.)</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-semibold text-xl mb-3 text-[#0066CC]">Digital Marketing Support</h3>
              <p>Available for when you're ready to grow bigger</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-16 bg-[#0066CC]/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">100% Transparent. No Hidden Charges.</h2>
          <p className="text-lg max-w-3xl mx-auto">
            We believe in clarity and honesty. What we offer is what you pay for — and nothing extra behind the scenes. 
            You'll always know the costs upfront.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Let's Talk – Book a Free Consultation Now</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Not sure how to start? Wondering how big your idea can go?
            Let's have a conversation. Our team will explain what's possible and how we can help — no pressure, 
            no sales push, just guidance.
          </p>
          <p className="text-lg mb-10">
            🎁 We'll even give you a free project roadmap if you choose to proceed later.
          </p>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            smoothScrollTo('#contact');
          }}>
            <Button className="bg-white text-[#FF6B00] hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 text-lg">
              Book Your Free Session Now
            </Button>
          </a>
          <p className="mt-6 text-sm">Slots are limited</p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Let's Make India Fully Digital – One Business at a Time</h2>
          <p className="text-lg max-w-3xl mx-auto mb-10">
            Whether you're in Patna or Pune, Darbhanga or Delhi, this is your time.
            Take the leap, go online, and let the world discover the value you offer.
          </p>
          <p className="text-2xl font-bold text-[#FF6B00]">
            📢 Ab Indian Banega Fully Digital – Join the Movement Today!
          </p>
        </div>
      </section>
      
      {/* Add the Footer component */}
      <Footer />
    </div>
  );
}