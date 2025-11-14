import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ChatbotWindow from "./ChatbotWindow";

const ChatbotButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open && <ChatbotWindow onClose={() => setOpen(false)} />}</AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl
                   border border-white/20 backdrop-blur-xl
                   bg-gradient-to-br from-[#1E4EED] via-[#14C77B] to-[#7B4DED]
                   hover:scale-110 active:scale-95 transition-all"
        whileHover={{ rotate: 5 }}
      >
        <MessageCircle className="text-white w-6 h-6" />
      </motion.button>
    </>
  );
};

export default ChatbotButton;
