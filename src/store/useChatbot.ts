import { useEffect, useState } from "react";
import { createTFIDFEngine } from "../rag/tfidfEngine";

interface Message {
  role: "user" | "bot";
  content: string;
}

const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hey! 👋 I'm the Ayyappan & Co AI Assistant. What’s on your mind?"
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [rag, setRag] = useState<any>(null);

  // Load TF-IDF engine at startup
  useEffect(() => {
    createTFIDFEngine().then((engine) => {
      setRag(engine);
    });
  }, []);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const lower = text.toLowerCase();
    let ragResponse = "";

    // Fetch TF-IDF response (if ready)
    if (rag) {
      try {
        ragResponse = await rag.query(lower);
      } catch (err) {
        ragResponse = "";
      }
    }

    let reply = "";

    // --------------------------
    // GREETINGS
    // --------------------------
    if (
      ["hi","hii","hello","hey","yo","hola","vanakkam","good morning","good evening","good afternoon"]
        .some((greet) => lower.includes(greet))
    ) {
      reply =
        "Hello there! 👋 Always happy to help. Ask me anything about our services, projects, company profile, or EPC capabilities!";
    }

    // --------------------------
    // COMPANY ABOUT / STORY
    // --------------------------
    else if (
      lower.includes("about") ||
      lower.includes("story") ||
      lower.includes("company") ||
      lower.includes("who are you")
    ) {
      reply =
        "Ayyappan & Co was founded in 2009 and has grown into one of India’s trusted power infrastructure companies — over 100+ completed projects, 500+ skilled technicians, and 14+ years of engineering excellence. We power progress with quality, safety, and reliability. ⚡";
    }

    // --------------------------
    // VISION & MISSION
    // --------------------------
    else if (lower.includes("vision")) {
      reply =
        "Our Vision: To be India’s most trusted and innovative power infrastructure company — built on engineering excellence and sustainable practices.";
    }

    else if (lower.includes("mission")) {
      reply =
        "Our Mission: Deliver world-class transmission and distribution infrastructure with safety, innovation, and client-first execution.";
    }

    // --------------------------
    // VALUES
    // --------------------------
    else if (lower.includes("value")) {
      reply =
        "Our core values are Quality, Safety, Excellence, and Integrity — these guide every project and every decision.";
    }

    // --------------------------
    // SERVICES
    // --------------------------
    else if (lower.includes("service")) {
      reply =
        "Our services include:\n• Transmission Line EPC up to 800 kV\n• Distribution Network EPC\n• AIS & GIS Substation Construction\n• Last-mile rural & urban electrification\n• Turnkey power infrastructure execution\nNeed details on any one? 😊";
    }

    // --------------------------
    // INDIVIDUAL SERVICES
    // --------------------------
    else if (lower.includes("transmission")) {
      reply =
        "We execute high-voltage Transmission Line projects up to 800kV — survey, foundations, tower erection, and stringing. Our team excels in all terrains and climates.";
    }

    else if (lower.includes("distribution")) {
      reply =
        "We develop large-scale distribution networks, including rural electrification and urban power upgrades with TNEB and other utilities.";
    }

    else if (lower.includes("substation")) {
      reply =
        "We execute AIS & GIS Extra High Voltage substations on a turnkey EPC basis — design, procurement, construction, testing & commissioning.";
    }

    // --------------------------
    // PROJECTS
    // --------------------------
    else if (lower.includes("project") || lower.includes("experience")) {
      reply =
        "We’ve completed 100+ Transmission and Distribution projects across Tamil Nadu, Kerala, AP, and Karnataka — 400kV, 230kV, 110kV lines, substations, and rural electrification works.";
    }

    // --------------------------
    // CONTACT
    // --------------------------
    else if (lower.includes("contact") || lower.includes("reach")) {
      reply =
        "You can always reach us via the Contact page or email at **info@ayyappanco.com**. Our team will get back to you quickly! 📩";
    }

    // --------------------------
    // LOCATION
    // --------------------------
    else if (lower.includes("location") || lower.includes("where")) {
      reply =
        "We operate pan-India, especially across Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka. Wherever the grid goes, we follow. ⚡🌍";
    }

    // --------------------------
    // BROCHURE / PDF
    // --------------------------
    else if (
      lower.includes("pdf") ||
      lower.includes("brochure") ||
      lower.includes("profile")
    ) {
      reply =
        "You can download our full Company Profile PDF from the Homepage — it includes services, project history, credentials, and capabilities.";
    }

    // --------------------------
    // RAG KNOWLEDGE MATCH
    // --------------------------
    else if (ragResponse && ragResponse.length > 10) {
      reply = "Here’s what I found from our records:\n" + ragResponse;
    }

    // --------------------------
    // FALLBACK
    // --------------------------
    else {
      reply =
        "I didn’t fully get that, but I'm here to help with our Services, Projects, EPC work, Company Profile, Substations, or Transmission Lines. Try asking about any of these! 😊";
    }

    // Final bot message
    const botMsg: Message = { role: "bot", content: reply };
    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  return { messages, sendMessage, isTyping };
};

export default useChatbot;
