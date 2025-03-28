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

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">1. Introduction</h2>
            <p className="mb-6">
              Synergy Brand Architect is committed to protecting your privacy. This policy explains how we handle your personal data.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">2. Information We Collect</h2>
            <p className="mb-6">
              We collect Device Information (browser, IP address, time zone) and personal data you provide (name, email, address) when using our services or registering.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">3. How We Use Your Data</h2>
            <p className="mb-6">
              We process minimal user data necessary for website operation, abuse prevention, and service delivery. Your data helps us provide and improve our services.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">4. Your Rights</h2>
            <p className="mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Right to be informed</li>
              <li>Right of access</li>
              <li>Right to rectification</li>
              <li>Right to erasure</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">5. Data Security</h2>
            <p className="mb-6">
              We maintain appropriate security measures to protect your data from unauthorized access or disclosure. However, no internet transmission is completely secure.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">6. Third-Party Links</h2>
            <p className="mb-6">
              Our website may contain links to other websites. We are not responsible for their privacy practices.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">7. Contact Information</h2>
            <p className="mb-6">
              For privacy-related inquiries, please contact us at hello@synergybrandarchitect.in
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}