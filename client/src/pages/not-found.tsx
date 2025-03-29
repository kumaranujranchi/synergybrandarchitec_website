import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <span className="text-9xl font-bold text-[#FF6B00]">404</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            
            <p className="text-gray-600 mb-8">
              We're sorry, the page you requested could not be found. 
              Please check the URL or navigate back to the homepage.
            </p>
            
            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90">
                  Return to Homepage
                </Button>
              </Link>
              
              <Link href="/#contact">
                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}