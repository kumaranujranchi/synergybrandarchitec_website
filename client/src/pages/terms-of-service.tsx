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
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2025</p>
            
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">1. Introduction</h2>
            <p className="mb-6">
              Welcome to Synergy Brand Architect. These Terms of Service ("Terms") govern your use of our website, services, and any other related applications or digital properties operated by Synergy Brand Architect. By using our services, you agree to these Terms in full. If you disagree with these Terms or any part of them, you must not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">2. Services</h2>
            <p className="mb-6">
              Synergy Brand Architect provides digital marketing and brand architecture services, including but not limited to brand strategy development, logo and identity design, social media marketing, content creation, web design and development, SEO services, and paid advertising management. The specific services to be provided to you will be detailed in a separate service agreement or proposal.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">3. Client Obligations</h2>
            <p className="mb-4">
              As a client, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and complete information as required for the provision of services.</li>
              <li>Respond to requests for information, approvals, or feedback in a timely manner.</li>
              <li>Pay for services as agreed in your service agreement or proposal.</li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>Hold necessary rights, licenses, or permissions for any content or materials you provide to us.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">4. Intellectual Property</h2>
            <p className="mb-6">
              Upon full payment for our services, you will receive rights to the final deliverables as specified in your service agreement. However, we retain ownership of all preliminary designs, concepts, and materials not selected for final production. We also retain the right to use completed projects in our portfolio unless explicitly agreed otherwise.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">5. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, Synergy Brand Architect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">6. Termination</h2>
            <p className="mb-6">
              Either party may terminate services as specified in the service agreement. Upon termination, you are responsible for payment of all services rendered up to the termination date, and any non-refundable fees or expenses as outlined in our Refund Policy and your service agreement.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">7. Privacy</h2>
            <p className="mb-6">
              Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">8. Amendments</h2>
            <p className="mb-6">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">9. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Patna, Bihar, India.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">10. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at:
              <br /><br />
              <strong>Synergy Brand Architect</strong><br />
              Email: legal@synergybrandarchitect.com<br />
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