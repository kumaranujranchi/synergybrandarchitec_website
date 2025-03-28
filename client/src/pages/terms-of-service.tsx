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

            <p className="mb-6">
              Welcome to Synergy Brand Architect!
            </p>
            
            <p className="mb-6">
              These terms and conditions outline the rules and regulations for the use of Synergy Brand Architect's Website, located at https://synergybrandarchitect.in.
            </p>
            
            <p className="mb-6">
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use Synergy Brand Architect if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Cookies:</h2>
            <p className="mb-6">
              The website uses cookies to help personalize your online experience. By accessing Synergy Brand Architect, you agreed to use the required cookies.
            </p>
            
            <p className="mb-6">
              A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a web server in the domain that issued the cookie to you.
            </p>
            
            <p className="mb-6">
              We may use cookies to collect, store, and track information for statistical or marketing purposes to operate our website. You have the ability to accept or decline optional Cookies. There are some required Cookies that are necessary for the operation of our website. These cookies do not require your consent as they always work.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">License:</h2>
            <p className="mb-6">
              Unless otherwise stated, Synergy Brand Architect and/or its licensors own the intellectual property rights for all material on Synergy Brand Architect. All intellectual property rights are reserved. You may access this from Synergy Brand Architect for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            
            <p className="mb-4">
              You must not:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Copy or republish material from Synergy Brand Architect</li>
              <li>Sell, rent, or sub-license material from Synergy Brand Architect</li>
              <li>Reproduce, duplicate or copy material from Synergy Brand Architect</li>
              <li>Redistribute content from Synergy Brand Architect</li>
            </ul>
            
            <p className="mb-6">
              This Agreement shall begin on the date hereof.
            </p>
            
            <p className="mb-6">
              Parts of this website offer users an opportunity to post and exchange opinions and information in certain areas of the website. Synergy Brand Architect does not filter, edit, publish or review Comments before their presence on the website. Comments do not reflect the views and opinions of Synergy Brand Architect, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.
            </p>
            
            <p className="mb-6">
              Synergy Brand Architect reserves the right to monitor all Comments and remove any Comments that can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>
            
            <p className="mb-4">
              You warrant and represent that:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent, or trademark of any third party;</li>
              <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material, which is an invasion of privacy.</li>
              <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            
            <p className="mb-6">
              You hereby grant Synergy Brand Architect a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Hyperlinking to our Content:</h2>
            <p className="mb-4">
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;</li>
              <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            
            <p className="mb-6">
              These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.
            </p>
            
            <p className="mb-6">
              We may consider and approve other link requests from the following types of organizations:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Commonly-known consumer and/or business information sources;</li>
              <li>Dot.com community sites;</li>
              <li>Associations or other groups representing charities;</li>
              <li>Online directory distributors;</li>
              <li>Internet portals;</li>
              <li>Accounting, law, and consulting firms;</li>
              <li>Educational institutions and trade associations.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Content Liability:</h2>
            <p className="mb-6">
              We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are raised on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Reservation of Rights:</h2>
            <p className="mb-6">
              We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>

            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Disclaimer:</h2>
            <p className="mb-6">
              To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Limit or exclude our or your liability for death or personal injury;</li>
              <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
              <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
              <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            
            <p className="mb-6">
              As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
            </p>
            
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">Contact Information:</h2>
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