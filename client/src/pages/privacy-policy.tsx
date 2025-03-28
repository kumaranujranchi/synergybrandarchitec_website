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
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2025</p>
            
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">1. Introduction</h2>
            <p className="mb-6">
              At Synergy Brand Architect ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">
              Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Identity Data includes first name, last name, username or similar identifier.</li>
              <li>Contact Data includes email address and telephone numbers.</li>
              <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li>Usage Data includes information about how you use our website, products, and services.</li>
              <li>Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">4. Data Security</h2>
            <p className="mb-6">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">5. Data Retention</h2>
            <p className="mb-6">
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">6. Your Legal Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">7. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br /><br />
              <strong>Synergy Brand Architect</strong><br />
              Email: info@synergybrandarchitect.com<br />
              Phone: +91 95252 30232
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}