import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { scrollToTop } from "@/lib/scrollHelper";

// Types
interface AddonProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  isActive: boolean;
}

export default function AddonsPage() {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<AddonProduct | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch products
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/addons"],
    queryFn: async () => {
      const response = await fetch("/api/addons");
      if (!response.ok) {
        throw new Error("Failed to fetch addon products");
      }
      return await response.json();
    },
  });
  
  // Extract products array from the response
  const productsData = data?.products as AddonProduct[] | undefined;

  const handleContactClick = () => {
    // Scroll to contact section on homepage
    if (window.location.pathname !== "/") {
      window.location.href = "/#contact";
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 mb-16">
        <section className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-4 text-[#333333]">
              Digital Marketing <span className="text-[#FF6B00]">Add-ons</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
              Enhance your digital presence with our specialized add-on services designed to boost your online performance.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load products</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {productsData?.map((product) => (
                <Card
                  key={product.id}
                  className="border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10 p-6">
                    <CardTitle className="text-xl font-semibold text-[#333333]">{product.name}</CardTitle>
                    <CardDescription className="mt-1 text-lg font-bold text-[#FF6B00]">
                      ₹{product.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 font-inter h-24 overflow-hidden text-ellipsis">
                      {product.description}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-3 flex-wrap">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white transition-all"
                      onClick={() => {
                        setSelectedProduct(product);
                        setDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      onClick={handleContactClick}
                      className="flex-1 bg-gradient-to-r from-[#FF6B00] to-[#FF8533] hover:from-[#FF8533] hover:to-[#FF9966] text-white"
                    >
                      Contact Us
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
        
        <section className="container mx-auto px-4 py-12 mt-8">
          <div className="bg-gradient-to-r from-[#0066CC]/10 to-[#FF6B00]/10 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#333333]">
                Need a <span className="text-[#FF6B00]">Custom Solution</span>?
              </h2>
              <p className="mt-3 text-gray-600 font-inter">
                Our digital marketing experts are ready to craft a personalized strategy for your business needs.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleContactClick}
                className="bg-[#FF6B00] hover:bg-[#FF8533] text-white font-medium py-2 px-6 rounded-full text-lg transition-all hover:shadow-md"
              >
                Request a Free Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Product Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-poppins font-bold text-[#333333]">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-xl font-semibold text-[#FF6B00]">
                  ₹{selectedProduct.price}
                </DialogDescription>
              </DialogHeader>
              <div className="my-6">
                <h4 className="font-semibold text-[#333333] mb-2">Description</h4>
                <p className="text-gray-600 font-inter whitespace-pre-line">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    handleContactClick();
                  }}
                  className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] hover:from-[#FF8533] hover:to-[#FF9966] text-white"
                >
                  Contact Us
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}