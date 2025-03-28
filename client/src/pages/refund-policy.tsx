import { Link } from "wouter";
import Header from "../components/header";
import Footer from "../components/footer";
import WhatsappButton from "../components/whatsapp-button";
import { ArrowLeft, RefreshCw } from "lucide-react";

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
            <p className="text-gray-600 mb-6">Last Updated: March 28, 2024</p>
            
            <h2 className="text-2xl font-semibold text-[#FF6B00] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#FF6B00]" /> Refund Policy Overview</h2>
            <p className="mb-6">
              At Synergy Brand Architect, we are committed to delivering high-quality digital solutions tailored to your business needs. We value your trust and strive to maintain full transparency in our processes.
            </p>
            
            <p className="mb-6">
              Because this initiative involves custom work (such as original website development, logo design, and content writing), we have established the following refund policy:
            </p>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Refund Eligibility</h2>
            <p className="mb-4">
              You may be eligible for a refund only under the following conditions:
            </p>
            
            <p className="mb-4 font-semibold">Project Cancellation Before Work Begins:</p>
            <p className="mb-6 pl-4">
              If you cancel the project before any design, development, or content work has started, you are eligible for a full refund.
            </p>
            
            <p className="mb-4 font-semibold">Delayed Project Start:</p>
            <p className="mb-6 pl-4">
              If we fail to start your project within 7 working days from the agreed start date (without valid communication), a full refund will be issued upon request.
            </p>
            
            <p className="mb-4 font-semibold">Failure to Deliver Basic Scope:</p>
            <p className="mb-6 pl-4">
              If we fail to deliver the agreed-upon website features mentioned in the ₹15,000 plan within 30 working days, and no reasonable explanation or revised timeline has been provided, you may request a partial or full refund based on the work completed.
            </p>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Non-Refundable Situations</h2>
            <p className="mb-4">
              Refunds will not be issued under the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>You cancel the project after the work has begun (design, content, or coding).</li>
              <li>You change your mind or no longer need the website after work has commenced.</li>
              <li>Delays caused due to lack of content, approvals, or communication from your side.</li>
              <li>You are dissatisfied with personal preferences (design taste, style) after multiple approved revisions.</li>
              <li>For fast delivery charges (₹6,999), refunds will not be granted once expedited work has begun.</li>
              <li>Source code request fees are non-refundable once delivered.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Refund Request Timeline</h2>
            <p className="mb-6">
              If eligible, you must request your refund within 7 days of the qualifying event by writing to us at:
              <br />
              📧 support@synergybrandarchitect.in with your payment receipt and reason for refund.
            </p>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Resolution First Approach</h2>
            <p className="mb-6">
              Before processing any refund, we prefer to work with you to resolve issues or delays. Our team will offer solutions and revised timelines to complete your project as promised. Refunds are treated as a last resort.
            </p>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Processing Time</h2>
            <p className="mb-6">
              Approved refunds will be processed within 7–10 working days to your original payment method.
            </p>

            <h2 className="text-2xl font-semibold text-[#0066CC] mb-4 flex items-center"><RefreshCw className="mr-2 text-[#0066CC]" /> Questions?</h2>
            <p className="mb-6">
              For any clarification regarding our refund policy, please feel free to contact us:
              <br />
              📞 +91-9525230232 | ✉️ support@synergybrandarchitect.in
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}