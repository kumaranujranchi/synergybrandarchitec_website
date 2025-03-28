import React from "react";
import Header from "@/components/header";
import PlanComparison from "@/components/plan-comparison";
import Footer from "@/components/footer";
import { ArrowRight, Check, Shield, Clock, BadgeCheck, Headphones } from "lucide-react";

const PricingBenefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-[#0066CC]" />,
      title: "Guaranteed Results",
      description: "We deliver measurable growth and ROI for your business."
    },
    {
      icon: <Clock className="w-8 h-8 text-[#0066CC]" />,
      title: "Timely Delivery",
      description: "Our team ensures all deliverables are completed on schedule."
    },
    {
      icon: <BadgeCheck className="w-8 h-8 text-[#0066CC]" />,
      title: "Quality Assurance",
      description: "Every project undergoes rigorous quality checks before delivery."
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#0066CC]" />,
      title: "Dedicated Support",
      description: "Get personalized assistance throughout your journey with us."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#FF6B00]">Our Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Synergy Brand Architect, we're committed to delivering exceptional value and results for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "While initial results can be seen within the first month, significant improvements in organic traffic and lead generation typically take 3-6 months, depending on your current online presence and industry competition."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade to a higher tier plan at any time. We'll provide a seamless transition and adjust your billing accordingly."
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we understand that each business has unique needs. Contact us to discuss a customized plan tailored specifically to your requirements and goals."
    },
    {
      question: "What happens after the first year?",
      answer: "Our plans include services for one year. After this period, you can renew your plan at the current rate or explore other options with us. Domain and hosting renewals will be billed separately if you choose not to continue with our services."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#FF6B00]">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and pricing plans.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0066CC] to-[#004999]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Grow Your Brand?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto mb-8">
          Take the first step towards transforming your online presence and growing your business.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold rounded-full transition-all hover:shadow-lg">
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a href="tel:+919525230232" className="inline-flex items-center justify-center px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-white font-semibold rounded-full transition-all">
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-16 bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transparent <span className="text-[#FF6B00]">Pricing</span> for Your Business Growth
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Choose from our range of comprehensive digital marketing and brand building packages designed to elevate your business.
            </p>
          </div>
        </section>
        
        <PlanComparison />
        <PricingBenefits />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}