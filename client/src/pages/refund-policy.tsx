import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center text-[#FF6B00] hover:text-[#0066CC] mb-8 transition-colors">
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Link>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8">Refund Policy</h1>
          
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2025</p>
            
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">1. Introduction</h2>
            <p className="mb-6">
              At Synergy Brand Architect, we are committed to ensuring your satisfaction with our services. This refund policy outlines our guidelines for refunds and cancellations for our digital marketing and brand architecture services.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">2. Service Contracts</h2>
            <p className="mb-6">
              All our services are provided under a signed contract or agreement that outlines the scope of work, deliverables, timeline, and payment terms. This refund policy should be read in conjunction with your specific service agreement, which may contain additional or different terms regarding refunds and cancellations.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">3. Refund Eligibility</h2>
            <p className="mb-4">
              Refunds may be issued under the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li><strong>Service Cancellation Prior to Commencement:</strong> If you cancel services before we begin work, you may be eligible for a refund minus an administrative fee (typically 10% of the deposit amount).</li>
              <li><strong>Inability to Deliver Services:</strong> If we are unable to deliver the agreed-upon services for any reason, you may be entitled to a full or partial refund, depending on the circumstances and any work already completed.</li>
              <li><strong>Substantial Service Deviation:</strong> If the delivered services substantially deviate from what was agreed upon, and we cannot remedy the situation, a partial refund may be considered.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">4. Non-Refundable Services</h2>
            <p className="mb-4">
              The following are generally non-refundable:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Services that have been fully delivered and completed.</li>
              <li>Custom work that has been completed according to your specifications.</li>
              <li>Deposits for work where significant resources have already been allocated to your project.</li>
              <li>Third-party costs that have already been incurred on your behalf (such as ad spend, software licenses, or stock photography).</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">5. Refund Process</h2>
            <p className="mb-6">
              To request a refund, please contact us at billing@synergybrandarchitect.com with your order details and reason for the refund request. We will review your request and respond within 5 business days. If approved, refunds will typically be processed within 10-15 business days and issued using the same payment method used for the original purchase.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">6. Project Cancellation</h2>
            <p className="mb-6">
              If you wish to cancel an ongoing project, please notify us in writing. The refund amount, if any, will depend on the stage of the project, work already completed, and resources already allocated. Cancellation fees may apply as outlined in your service agreement.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">7. Changes to This Policy</h2>
            <p className="mb-6">
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website and will apply to all services contracted after the posting date.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">8. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about our refund policy, please contact us at:
              <br /><br />
              <strong>Synergy Brand Architect</strong><br />
              Email: billing@synergybrandarchitect.com<br />
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