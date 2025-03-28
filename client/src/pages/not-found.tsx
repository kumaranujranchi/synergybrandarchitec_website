import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <AlertCircle className="h-8 w-8 text-[#FF6B00]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-[#FF6B00] hover:bg-[#e05f00] text-white">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white">
              <Link href="/#contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsappButton />
    </div>
  );
}
