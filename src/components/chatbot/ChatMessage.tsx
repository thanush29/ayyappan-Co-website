import React from "react";

interface ChatMessageProps {
  message: {
    role: "user" | "bot";
    content: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 max-w-[75%] text-sm rounded-2xl shadow-sm ${
          isUser
            ? "bg-gray-800 text-white rounded-br-none"
            : "bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
