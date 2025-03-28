import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/scrollHelper";

type Service = {
  id: number;
  name: string;
  description: string;
  sectionId: string;
};

const services: Service[] = [
  {
    id: 1,
    name: "Brand Strategy",
    description: "Define your unique market position and connect with your target audience through our comprehensive brand strategy.",
    sectionId: "services"
  },
  {
    id: 2,
    name: "Logo Design",
    description: "Get a distinctive visual identity with our professional logo design services.",
    sectionId: "services"
  },
  {
    id: 3,
    name: "Website Development",
    description: "Create a responsive, SEO-friendly website optimized for conversions and exceptional user experience.",
    sectionId: "services"
  },
  {
    id: 4,
    name: "SEO Optimization",
    description: "Improve your search engine visibility and drive organic traffic with our tailored SEO strategies.",
    sectionId: "services"
  },
  {
    id: 5,
    name: "Social Media Marketing",
    description: "Build brand awareness and engagement through strategic content and campaigns across social media platforms.",
    sectionId: "services"
  },
  {
    id: 6,
    name: "Email Marketing",
    description: "Nurture leads and drive conversions with targeted email campaigns and automated sequences.",
    sectionId: "services"
  },
  {
    id: 7,
    name: "Video Marketing",
    description: "Create engaging video content to increase engagement and stand out from competitors.",
    sectionId: "services"
  },
  {
    id: 8,
    name: "Marketing Automation",
    description: "Streamline your lead nurturing and sales processes with intelligent automation tools.",
    sectionId: "services"
  },
  {
    id: 9,
    name: "Online Reputation Management",
    description: "Build and protect your brand's credibility across digital platforms.",
    sectionId: "services"
  }
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  recommendations?: Service[];
}

export default function ServiceRecommendation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitially, setShowInitially] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! 👋 I'm Synergy AI Assistant. How can I help you today with your branding or digital marketing needs?",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds of page load
    const timer = setTimeout(() => {
      setShowInitially(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (showInitially) {
      setShowInitially(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsBotTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const recommendedServices = getRecommendedServices(inputValue);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue, recommendedServices),
        isUser: false,
        recommendations: recommendedServices
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1500);
  };

  const getRecommendedServices = (userQuery: string): Service[] => {
    const query = userQuery.toLowerCase();
    
    // Simple keyword matching for service recommendations
    const keywordMap: { [key: string]: number[] } = {
      "brand": [1, 2, 4],
      "logo": [2],
      "design": [2],
      "website": [3],
      "web": [3],
      "site": [3],
      "seo": [4],
      "search": [4],
      "google": [4],
      "ranking": [4],
      "social": [5],
      "facebook": [5],
      "instagram": [5],
      "linkedin": [5],
      "email": [6],
      "newsletter": [6],
      "video": [7],
      "youtube": [7],
      "reels": [7],
      "automation": [8],
      "crm": [8],
      "leads": [8, 6],
      "reputation": [9],
      "reviews": [9],
      "feedback": [9],
      "identity": [1, 2],
      "start": [1, 2, 3],
      "beginning": [1, 2, 3],
      "new": [1, 2, 3]
    };
    
    // Find matching services based on keywords
    const matchingServiceIds = new Set<number>();
    
    Object.entries(keywordMap).forEach(([keyword, serviceIds]) => {
      if (query.includes(keyword)) {
        serviceIds.forEach(id => matchingServiceIds.add(id));
      }
    });
    
    // If no specific matches, recommend strategic services
    if (matchingServiceIds.size === 0) {
      return [services[0], services[2], services[4]]; // Brand Strategy, Website, Social Media
    }
    
    return services.filter(service => matchingServiceIds.has(service.id));
  };

  const getBotResponse = (userQuery: string, recommendedServices: Service[]): string => {
    if (recommendedServices.length === 0) {
      return "I'm not sure I understand your needs. Could you tell me more about what you're looking for?";
    }
    
    const query = userQuery.toLowerCase();
    
    // Personalized responses based on query patterns
    if (query.includes("hello") || query.includes("hi ") || query.includes("hey")) {
      return "Hello! 👋 Based on your interests, I think these services might be helpful for you:";
    }
    
    if (query.includes("cost") || query.includes("price") || query.includes("pricing") || query.includes("package")) {
      return "Our pricing depends on your specific needs. Based on what you're asking about, here are some services that might interest you:";
    }
    
    if (query.includes("time") || query.includes("long") || query.includes("duration") || query.includes("when")) {
      return "Project timelines vary based on complexity. For the services you're interested in, here are some options we offer:";
    }
    
    return "Based on what you're looking for, I'd recommend these services:";
  };

  const handleServiceClick = (sectionId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      smoothScrollTo(`#${sectionId}`);
    }, 300);
  };

  return (
    <>
      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-24 z-50">
        <AnimatePresence>
          {showInitially && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-white p-4 rounded-lg shadow-lg mb-4 max-w-xs fixed bottom-24 right-24"
            >
              <button
                onClick={() => setShowInitially(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
              <p className="text-sm">
                Need help choosing the right service for your business? Chat with our AI assistant! 🤖
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePopup}
          className="w-16 h-16 bg-[#0066CC] rounded-full flex items-center justify-center shadow-lg hover:bg-[#005bb7] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat with AI Assistant"
        >
          <Briefcase className="text-white text-3xl" />
        </motion.button>
      </div>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-24 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Briefcase className="mr-2" size={20} />
                <h3 className="font-medium">Synergy AI Assistant</h3>
              </div>
              <button
                onClick={togglePopup}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-80 overflow-y-auto flex flex-col space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.isUser
                        ? 'bg-[#0066CC] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.recommendations.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => handleServiceClick(service.sectionId)}
                            className="w-full text-left px-3 py-2 bg-white text-[#0066CC] text-xs rounded border border-[#0066CC]/30 hover:bg-[#0066CC]/10 transition-colors"
                          >
                            <div className="font-medium">{service.name}</div>
                            <div className="text-gray-600 text-xs mt-1 line-clamp-2">{service.description}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="border-t p-3 flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask about our services..."
                className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              />
              <Button
                type="submit"
                className="bg-[#0066CC] hover:bg-[#005bb7] rounded-l-none"
              >
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}