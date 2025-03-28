import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center text-[#FF6B00] hover:text-[#0066CC] mb-8 transition-colors">
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Link>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8">Privacy Policy</h1>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2024</p>

            <p className="mb-6">
              Synergy Brand Architect website is owned by Synergy Brand Architect, which is a data controller of your personal data.
            </p>
            
            <p className="mb-6">
              We have adopted this Privacy Policy, which determines how we are processing the information collected by Synergy Brand Architect, which also provides the reasons why we must collect certain personal data about you. Therefore, you must read this Privacy Policy before using Synergy Brand Architect website.
            </p>
            
            <p className="mb-6">
              We take care of your personal data and undertake to guarantee its confidentiality and security.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Personal information we collect:</h2>
            <p className="mb-6">
              When you visit the Synergy Brand Architect, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the installed cookies on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site. We refer to this automatically-collected information as "Device Information."
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Why do we process your data?</h2>
            <p className="mb-6">
              Our top priority is customer data security, and, as such, we may process only minimal user data, only as much as it is absolutely necessary to maintain the website. Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding website usage. This statistical information is not otherwise aggregated in such a way that it would identify any particular user of the system.
            </p>
            
            <p className="mb-6">
              You can visit the website without telling us who you are or revealing any information, by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the website's features, or you wish to receive our newsletter or provide other details by filling a form, you may provide personal data to us, such as your email, first name, last name, city of residence, organization, telephone number. You can choose not to provide us with your personal data, but then you may not be able to take advantage of some of the website's features.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Your rights:</h2>
            <p className="mb-4">
              If you are a European resident, you have the following rights related to your personal data:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to be informed.</li>
              <li>The right of access.</li>
              <li>The right to rectification.</li>
              <li>The right to erasure.</li>
              <li>The right to restrict processing.</li>
              <li>The right to data portability.</li>
              <li>The right to object.</li>
              <li>Rights in relation to automated decision-making and profiling.</li>
            </ul>
            
            <p className="mb-6">
              If you would like to exercise this right, please contact us through the contact information below.
            </p>
            
            <p className="mb-6">
              Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you (for example, if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information might be transferred outside of Europe, including Canada and the United States.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Links to other websites:</h2>
            <p className="mb-6">
              Our website may contain links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for such other websites or third parties' privacy practices. We encourage you to be aware when you leave our website and read the privacy statements of each website that may collect personal information.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Information security:</h2>
            <p className="mb-6">
              We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We keep reasonable administrative, technical, and physical safeguards to protect against unauthorized access, use, modification, and personal data disclosure in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Legal disclosure:</h2>
            <p className="mb-6">
              We will disclose any information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Contact information:</h2>
            <p className="mb-6">
              If you would like to contact us to understand more about this Policy or wish to contact us concerning any matter relating to individual rights and your Personal Information, you may send an email to hello@synergybrandarchitect.in.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}