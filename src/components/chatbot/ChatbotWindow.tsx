import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { motion } from "framer-motion";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import useChatbot from "../../store/useChatbot";

interface ChatbotWindowProps {
  onClose: () => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ onClose }) => {
  const { messages, sendMessage, isTyping } = useChatbot();
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // AUTO SCROLL TO BOTTOM
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ type: "spring", duration: 0.7 }}
      className="
        fixed bottom-20 right-6 w-80 md:w-96 rounded-2xl shadow-2xl z-50
        bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/20
      "
    >
      {/* HEADER */}
      <div
        className="
          flex justify-between items-center p-4 rounded-t-2xl
          bg-gradient-to-r from-[#1E4EED] via-[#14C77B] to-[#7B4DED]
          shadow-md
        "
      >
        <h3 className="font-semibold text-white drop-shadow-sm">
          Ayyappan & Co Assistant
        </h3>
        <button
          onClick={onClose}
          className="text-white hover:scale-110 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* MESSAGES */}
      <div
        className="
          flex-1 overflow-y-auto p-4 space-y-3 max-h-80
          scrollbar-thin scrollbar-thumb-[#7B4DED]/60 scrollbar-track-transparent
        "
      >
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        {/* AUTO SCROLL TARGET */}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div
        className="
          flex items-center p-3 border-t border-white/20
          bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-xl
        "
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask something..."
          className="
            flex-1 px-4 py-2 text-sm rounded-full
            bg-white/80 shadow-inner
            focus:outline-none focus:ring-2 focus:ring-[#7B4DED]/40
          "
        />

        <button
          onClick={handleSend}
          className="
            ml-3 p-2 rounded-full
            bg-gradient-to-r from-[#1E4EED] to-[#7B4DED]
            text-white shadow-md
            hover:brightness-110 active:scale-95 transition
          "
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatbotWindow;
