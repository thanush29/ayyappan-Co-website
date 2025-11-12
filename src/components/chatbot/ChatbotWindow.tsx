import React, { useState } from "react";
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

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="fixed bottom-20 right-6 w-80 md:w-96 bg-white/70 backdrop-blur-xl shadow-2xl rounded-xl border border-gray-200 flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-gray-100 to-white rounded-t-xl">
        <h3 className="font-semibold text-gray-800">Ayyappanco Chat Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-white/60 backdrop-blur-md border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatbotWindow;
