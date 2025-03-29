import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import ServicePackageComparison from "@/components/service-package-comparison";
import { ArrowRight, Shield, Clock, BadgeCheck, Headphones, Gift, Calendar, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Singh",
      position: "CEO, Wishluv Buildcon",
      quote: "Synergy Brand Architect transformed our real estate business with their strategic marketing. Our leads increased by 270% within three months of working with them.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      rating: 5
    },
    {
      name: "Priya Mehta",
      position: "Marketing Director, Biryani Mahal",
      quote: "Their social media strategy helped us grow our restaurant business even during the pandemic. The ROI we've seen is incredible, and their team is responsive and professional.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      rating: 5
    },
    {
      name: "Vikas Kumar",
      position: "Founder, The Helping Hand",
      quote: "As an e-commerce business, we needed a partner who understood digital marketing. The team at Synergy Brand Architect provided invaluable insights and executed a strategy that doubled our online sales.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[#0066CC]/5 to-[#FF6B00]/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-[#FF6B00]">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from businesses who have transformed their digital presence with our marketing packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueAddedFeatures = () => {
  const features = [
    {
      icon: <Gift className="h-10 w-10 text-[#FF6B00]" />,
      title: "Bonus Resources",
      description: "All plans include free access to our marketing resources library, including templates, guides, and checklists.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-[#FF6B00]" />,
      title: "Flexible Terms",
      description: "Choose between monthly and quarterly billing options with no long-term contracts required.",
    },
    {
      icon: <Clock className="h-10 w-10 text-[#FF6B00]" />,
      title: "Quick Response",
      description: "Our team responds to all client inquiries within 4 business hours, ensuring minimal delays.",
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto bg-[#FF6B00]/10 p-4 rounded-full inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
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
    },
    {
      question: "Do you work with businesses outside of Patna?",
      answer: "Yes, while we're based in Patna, we work with businesses across India. Our digital marketing strategies can be implemented regardless of your location."
    },
    {
      question: "What if I want to cancel my subscription?",
      answer: "You can cancel your monthly subscription at any time with 30 days' notice. For quarterly plans, you can cancel after the 3-month commitment period with the same notice period."
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

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full mb-8 grid grid-cols-2">
              <TabsTrigger value="general">General Questions</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              {faqs.slice(0, 3).map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-6">
              {faqs.slice(3).map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
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
          <button 
            onClick={() => {
              // Always redirect to home page contact section
              window.location.href = '/#contact';
            }} 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-semibold rounded-full transition-all hover:shadow-lg"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <a href="tel:+919525230232" className="inline-flex items-center justify-center px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white font-semibold rounded-full transition-all">
            Call Us Now: 952-523-0232
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
        
        {/* New service package comparison component */}
        <ServicePackageComparison />
        
        <ValueAddedFeatures />
        <Testimonials />
        <PricingBenefits />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}