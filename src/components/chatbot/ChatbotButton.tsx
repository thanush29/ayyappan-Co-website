import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatbotWindow from "./ChatbotWindow";

const ChatbotButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <ChatbotWindow
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg bg-white/70 backdrop-blur-lg hover:scale-105 transition-transform border border-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="text-gray-800 w-6 h-6" />
      </motion.button>
    </>
  );
};

export default ChatbotButton;
