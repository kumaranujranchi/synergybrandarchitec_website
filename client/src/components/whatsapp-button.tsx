import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <motion.a
      href="https://wa.me/919525230232"
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </motion.a>
  );
}
