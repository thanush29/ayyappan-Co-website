import { useState } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello 👋! I'm the Ayyappanco Assistant. How can I help you today?" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const mockWebsiteData = `
    Ayyappanco specializes in EPC (Engineering, Procurement, and Construction) services.
    We handle transmission lines, substations, and civil infrastructure projects.
    Our expertise covers power systems, renewable integration, and industrial facilities.
  `;

  const mockPdfData = `
    Book.pdf includes our project portfolio, client list, and certifications.
    We have executed multiple 400kV and 220kV transmission line projects across India.
  `;

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulated delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "I'm not sure about that yet, but I'll learn soon!";

      if (lower.includes("service") || lower.includes("project")) {
        reply =
          "We provide EPC services in transmission lines, substations, and civil works.";
      } else if (lower.includes("location") || lower.includes("where")) {
        reply = "We operate across India, with strong presence in Tamil Nadu and nearby states.";
      } else if (lower.includes("book") || lower.includes("pdf")) {
        reply = "Our company profile in book.pdf includes detailed project case studies and certifications.";
      } else if (lower.includes("hello") || lower.includes("hi")) {
        reply = "Hello! How can I assist you about Ayyappanco today?";
      } else if (lower.includes("contact")) {
        reply = "You can reach us via the contact page on our website or by email at info@ayyappanco.com.";
      } else {
        // fallback context-based mock
        reply = `From our company data: ${mockWebsiteData} ${mockPdfData}`;
      }

      const botMsg: Message = { role: "bot", content: reply };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return { messages, sendMessage, isTyping };
};

export default useChatbot;
