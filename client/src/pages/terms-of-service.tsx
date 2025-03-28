import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center text-[#FF6B00] hover:text-[#0066CC] mb-8 transition-colors">
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Link>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8">Terms of Service</h1>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2024</p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">1. Introduction</h2>
            <p className="mb-6">
              Welcome to Synergy Brand Architect! These terms and conditions outline the rules and regulations for the use of our Website, located at https://synergybrandarchitect.in. By accessing this website, we assume you accept these terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">2. Cookies</h2>
            <p className="mb-6">
              The website uses cookies to help personalize your online experience. Cookies are text files placed on your hard disk by a web server. They cannot be used to run programs or deliver viruses. We use cookies to collect, store, and track information for statistical or marketing purposes. You can accept or decline optional Cookies, though some required Cookies are necessary for website operation.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">3. License and Content Usage</h2>
            <p className="mb-4">
              Unless otherwise stated, Synergy Brand Architect owns all intellectual property rights for website content. You must not:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Copy or republish material</li>
              <li>Sell, rent, or sub-license material</li>
              <li>Reproduce or duplicate material</li>
              <li>Redistribute content</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">4. User Comments</h2>
            <p className="mb-6">
              Parts of this website allow users to post comments. We do not filter comments before publication, and they reflect the views of the poster, not Synergy Brand Architect. We reserve the right to monitor and remove inappropriate comments.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">5. Hyperlinking</h2>
            <p className="mb-6">
              Certain organizations may link to our website without prior approval, including government agencies, search engines, and news organizations. Other organizations must request approval by contacting us.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">6. Content Liability</h2>
            <p className="mb-6">
              We shall not be held responsible for any content appearing on linked websites. No links should appear that may be interpreted as libelous, obscene, or criminal.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">7. Disclaimer</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, we exclude all representations and warranties. We will not be liable for any loss or damage except where excluded by law.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">8. Contact Information</h2>
            <p className="mb-6">
              For any questions regarding these terms, please contact us at hello@synergybrandarchitect.in
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappButton />
    </div>
  );
}