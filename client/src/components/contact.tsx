import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  city: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      service: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", values);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Ready to grow your business? Contact us today for a free consultation and let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="px-4 py-3 h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            type="email" 
                            {...field} 
                            className="px-4 py-3 h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+91 98765 43210" 
                            type="tel" 
                            {...field} 
                            className="px-4 py-3 h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your City" 
                            {...field} 
                            className="px-4 py-3 h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="px-4 py-3 h-auto border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="brand_strategy">Brand Strategy</SelectItem>
                            <SelectItem value="logo_design">Logo & Identity Design</SelectItem>
                            <SelectItem value="seo">SEO Optimization</SelectItem>
                            <SelectItem value="social_media">Social Media Marketing</SelectItem>
                            <SelectItem value="paid_ads">Paid Advertising</SelectItem>
                            <SelectItem value="other">Other Services</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#333333] font-medium">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project..." 
                            {...field} 
                            rows={5}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-medium py-3 px-8 rounded-full transition-all hover:shadow-md hover:-translate-y-1 w-full h-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="font-poppins font-semibold text-2xl mb-6 text-[#333333]">Contact Information</h3>
              
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Visit Our Office</h4>
                  <p className="text-gray-600">
                    East Gola Road, Vivek Vihar Colony<br />
                    Danapur Nizamat, Patna 801503
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Call Us</h4>
                  <p className="text-gray-600">
                    +91 9525 230232
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-[#333333] mb-1">Email Us</h4>
                  <p className="text-gray-600">
                    info@synergybrandarchitect.in<br />
                    support@synergybrandarchitect.in
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="font-poppins font-semibold text-2xl mb-6 text-[#333333]">Business Hours</h3>
              
              <div className="flex justify-between mb-3">
                <span className="text-[#333333] font-medium">Monday - Friday:</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM</span>
              </div>
              
              <div className="flex justify-between mb-3">
                <span className="text-[#333333] font-medium">Saturday:</span>
                <span className="text-gray-600">10:00 AM - 4:00 PM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-[#333333] font-medium">Sunday:</span>
                <span className="text-gray-600">Closed</span>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-[#333333] mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/synergybrandarchitect" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="https://twitter.com/synergybrandarch" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
