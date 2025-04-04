import { motion } from "framer-motion";
import { Calendar, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    image: "https://i.imgur.com/2CRAPx2.jpg",
    date: "May 15, 2023",
    category: "Digital Marketing",
    title: "5 Digital Marketing Trends to Watch in 2023",
    description: "Stay ahead of the competition with these emerging digital marketing strategies that are reshaping the industry."
  },
  {
    image: "https://i.imgur.com/0FRzklN.jpg",
    date: "April 28, 2023",
    category: "SEO",
    title: "The Ultimate Guide to Local SEO for Patna Businesses",
    description: "Learn how to optimize your business for local search and attract more customers from your area."
  },
  {
    image: "https://i.imgur.com/3N2cv7I.jpg",
    date: "April 10, 2023",
    category: "Brand Building",
    title: "How to Build a Brand That Resonates With Your Audience",
    description: "Discover the key elements of creating a meaningful brand identity that connects with customers on a deeper level."
  }
];

export default function Blog() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-poppins font-semibold text-3xl md:text-4xl mb-4 text-[#333333]">Latest Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Stay updated with the latest marketing trends, strategies, and industry insights from our experts.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={item}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-sm text-gray-500 mr-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> {post.date}
                  </span>
                  <span className="text-sm text-[#FF6B00] flex items-center">
                    <Folder className="w-4 h-4 mr-1" /> {post.category}
                  </span>
                </div>
                <h3 className="font-poppins font-medium text-xl mb-3 text-[#333333]">{post.title}</h3>
                <p className="text-gray-600 mb-4 font-inter">
                  {post.description}
                </p>
                <a href="#" className="text-[#FF6B00] font-medium flex items-center">
                  Read More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button 
            variant="outline"
            className="bg-white border-2 border-[#FF6B00] text-[#FF6B00] font-medium py-3 px-8 rounded-full hover:bg-[#FF6B00] hover:text-white transition-colors h-auto"
          >
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
