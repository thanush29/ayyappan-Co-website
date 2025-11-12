import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex space-x-1 ml-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    </div>
  );
};

export default TypingIndicator;
