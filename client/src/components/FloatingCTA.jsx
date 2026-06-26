"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bot,
  Phone,
  MessageCircle,
  Mail,
  RotateCcw,
  MessageSquare,
  Search,
  CornerDownLeft,
  HelpCircle,
  User,
} from "lucide-react";
import Fuse from "fuse.js";

// ==========================================
// 1. FAQ DATA
// ==========================================
const faqData = [
  {
    id: 1,
    question: "How do I register as a vendor on Event Sathi?",
    answer:
      "To register as a vendor, click on the 'Join as Vendor' button on our homepage. Fill out your business profile, service categories, pricing packages, and upload high-quality pictures of your past events. Our onboarding team will review and approve your profile within 24-48 hours.",
    keywords: [
      "vendor registration",
      "become vendor",
      "join vendor",
      "seller signup",
      "vendr",
      "register merchant",
    ],
    popular: true,
  },
  {
    id: 2,
    question: "What are the payment and booking terms?",
    answer:
      "Bookings are locked upon paying a partial advance token amount specified by the vendor via the Event Sathi platform. The remaining balance is handled directly with the vendor based on the milestone terms signed in the service contract. All booking logs are tracked safely in your dashboard.",
    keywords: [
      "payment",
      "bookingg",
      "advance money",
      "token amount",
      "price terms",
      "fees",
    ],
    popular: true,
  },
  {
    id: 3,
    question: "Can I cancel or reschedule a booked event?",
    answer:
      "Yes, cancellations and rescheduling depend strictly on the individual vendor's policy shown at the time of booking. Go to 'My Bookings', select the event, and check options. Any eligible refunds are processed into your native account within 5-7 business days.",
    keywords: [
      "cancel booking",
      "reschedule event",
      "change date",
      "refund money",
      "cancelation policy",
    ],
    popular: false,
  },
  {
    id: 4,
    question: "How does Event Sathi verify vendors?",
    answer:
      "Every partner on Event Sathi goes through a multi-step verification program including government identity checks, physical portfolio evaluation, and past client feedback analysis to ensure top-notch luxury standards for your premium events.",
    keywords: [
      "verify vendor",
      "trusted partners",
      "safe booking",
      "fraud check",
      "quality service",
    ],
    popular: true,
  },
  {
    id: 5,
    question: "Are there any hidden service fees or charges?",
    answer:
      "No, transparency is our core principle. The prices you see from verified vendors are all-inclusive of native taxes unless specified otherwise in their custom optional add-ons setup.",
    keywords: [
      "hidden charges",
      "extra fees",
      "service tax",
      "pricing cost",
      "commission",
    ],
    popular: false,
  },
  {
    id: 6,
    question: "How do I reach customer support if a vendor doesn't respond?",
    answer:
      "If a vendor fails to respond within 12 hours of a premium request, you can instantly escalate it by tapping our emergency helpline or mailing support@eventsathi.com. A dedicated Event Buddy will be assigned to resolve it.",
    keywords: [
      "support team",
      "no response",
      "complain vendor",
      "help desk",
      "customer care",
    ],
    popular: true,
  },
  {
    id: 7,
    question: "Can I book multiple vendors for a single wedding event?",
    answer:
      "Absolutely! You can use our centralized Event Sathi Cart feature to select separate vendors for catering, photography, decoration, and music, managing them under a unified single master timeline dashboard.",
    keywords: [
      "multiple vendors",
      "wedding planning",
      "catering photo package",
      "cart system",
      "partnr",
    ],
    popular: true,
  },
];

// 2. SEARCH UTILITY
const fuseOptions = {
  keys: [
    { name: "question", weight: 0.6 },
    { name: "keywords", weight: 0.4 },
  ],
  threshold: 0.35,
  distance: 100,
  ignoreLocation: true,
};

let fuseInstance = null;
const searchFAQs = (query, data) => {
  if (!query || query.trim() === "") return [];
  if (!fuseInstance) fuseInstance = new Fuse(data, fuseOptions);
  const results = fuseInstance.search(query);
  return results.map((result) => result.item).slice(0, 5);
};

// 3. SUB-COMPONENTS FOR CHAT WINDOW
function ChatMessage({ type, text }) {
  const isBot = type === "bot";
  return (
    <div
      className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 border border-[var(--color-accent)]/30 shadow-xs">
          <Bot className="w-3.5 h-3.5" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm shadow-xs leading-relaxed whitespace-pre-line ${isBot ? "bg-white text-[var(--color-text-primary)] border border-[var(--color-accent)]/15 rounded-tl-none" : "bg-[var(--color-primary)] text-white rounded-tr-none"}`}
      >
        {text}
      </div>
      {!isBot && (
        <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
          <User className="w-3.5 h-3.5" />
        </div>
      )}
    </div>
  );
}

function SuggestionList({ items, onSelect, highlight }) {
  const highlightText = (text, target) => {
    if (!target) return text;
    const parts = text.split(new RegExp(`(${target})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === target.toLowerCase() ? (
            <span
              key={i}
              className="text-[var(--color-primary)] font-bold underline bg-[var(--color-accent)]/10"
            >
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest px-1 mb-1">
        💡 Suggested Results
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="w-full text-left p-3 text-xs md:text-sm bg-white/50 hover:bg-white border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40 rounded-xl text-[var(--color-text-primary)] transition-all cursor-pointer flex items-start gap-2.5 group hover:shadow-xs focus:outline-none"
          >
            <HelpCircle className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0 opacity-70" />
            <span className="font-medium leading-normal">
              {highlightText(item.question, highlight)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ChatInput({
  value,
  onChange,
  onClear,
  disabled,
  suggestions,
  onSelectTopSuggestion,
}) {
  // const inputRef = useRef(null);
  // useEffect(() => {
  //   if (!disabled && inputRef.current) inputRef.current.focus();
  // }, [disabled]);

  return (
    <div className="p-3 bg-white border-t border-[var(--color-accent)]/20 flex items-center relative">
      <div className="absolute left-6 text-[var(--color-text-muted)]">
        <Search className="w-4 h-4 opacity-70" />
      </div>
      <input
        // ref={inputRef}
        type="text"
        value={disabled ? "Click back button to search..." : value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled && suggestions.length > 0) {
            e.preventDefault();
            onSelectTopSuggestion();
          }
        }}
        disabled={disabled}
        placeholder="Type keyword (e.g., vendr, bookingg)..."
        className="w-full pl-9 pr-12 py-2.5 bg-[var(--color-bg)]/50 border border-[var(--color-accent)]/20 rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/70 focus:outline-none focus:border-[var(--color-accent)] transition-all"
      />
      {value && !disabled && (
        <button
          onClick={onClear}
          className="absolute right-12 text-[var(--color-text-muted)] hover:text-[var(--color-emergency)] cursor-pointer p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      <div className="absolute right-6 flex items-center text-[var(--color-text-muted)] opacity-40">
        <CornerDownLeft className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

function ChatWindow({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const suggestions = useMemo(
    () => searchFAQs(debouncedQuery, faqData),
    [debouncedQuery],
  );
  const popularFAQs = useMemo(
    () => faqData.filter((item) => item.popular).slice(0, 6),
    [],
  );

  const handleSelectFAQ = (faq) => {
    setSelectedFAQ(faq);
    setSearchQuery("");
  };
  const handleReset = () => {
    setSelectedFAQ(null);
    setSearchQuery("");
  };
  const hasNoResults =
    debouncedQuery.length > 1 && suggestions.length === 0 && !selectedFAQ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed bottom-20 right-2 left-2 sm:left-auto sm:right-6 w-auto sm:w-[400px] h-[500px] max-h-[75vh] bg-[var(--color-bg)] rounded-2xl border border-[var(--color-accent)]/30 shadow-2xl flex flex-col overflow-hidden font-['Inter'] z-[1002]"
    >
      {/* HEADER */}
      <div className="bg-[var(--color-primary)] p-4 flex items-center justify-between border-b border-[var(--color-accent)]/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-accent)]/40">
            <Bot className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-white font-['Playfair_Display'] font-bold text-sm sm:text-base leading-tight tracking-wide">
              Event Sathi Assistant
            </h3>
            <p className="text-stone-300 text-[11px]">
              Ask anything about Event Sathi
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-stone-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        <AnimatePresence mode="wait">
          {selectedFAQ ? (
            <motion.div
              key="answer-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-4"
            >
              <ChatMessage type="user" text={selectedFAQ.question} />
              <ChatMessage type="bot" text={selectedFAQ.answer} />
              <div className="pt-2 flex justify-start">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] border border-[var(--color-primary)]/20 px-3 py-1.5 rounded-full transition-all cursor-pointer bg-white/40 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Back to Questions
                </button>
              </div>
            </motion.div>
          ) : hasNoResults ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 space-y-4"
            >
              <p className="text-[var(--color-text-primary)] text-sm font-medium px-4">
                Sorry, I could not find a relevant answer for "{debouncedQuery}
                ".
              </p>
              <div className="p-3.5 bg-white/60 rounded-xl border border-[var(--color-accent)]/20 inline-block mx-4">
                <p className="text-[var(--color-text-muted)] text-xs mb-3 font-semibold uppercase tracking-wider">
                  Please contact our team directly:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:+919999999999"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-[var(--color-primary)] border border-[var(--color-accent)]/30 rounded-lg text-[var(--color-primary)] hover:text-white transition-all text-center"
                  >
                    <Phone className="w-4 h-4" />{" "}
                    <span className="text-[10px] font-bold">Call</span>
                  </a>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-emerald-600 border border-[var(--color-accent)]/30 rounded-lg text-emerald-600 hover:text-white transition-all text-center"
                  >
                    <MessageCircle className="w-4 h-4" />{" "}
                    <span className="text-[10px] font-bold">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:support@eventsathi.com"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-[var(--color-accent)] border border-[var(--color-accent)]/30 rounded-lg text-[var(--color-accent)] hover:text-white transition-all text-center"
                  >
                    <Mail className="w-4 h-4" />{" "}
                    <span className="text-[10px] font-bold">Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ) : searchQuery.trim().length > 0 ? (
            <motion.div key="suggestions-list">
              <SuggestionList
                items={suggestions}
                onSelect={handleSelectFAQ}
                highlight={searchQuery}
              />
            </motion.div>
          ) : (
            <motion.div
              key="popular-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="text-xs font-bold text-[var(--color-text-muted)] tracking-wider uppercase mb-1 px-1">
                🔥 Popular Questions
              </div>
              <div className="flex flex-col gap-2">
                {popularFAQs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleSelectFAQ(faq)}
                    className="w-full text-left p-3 text-xs md:text-sm bg-white/70 hover:bg-white border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/50 rounded-xl text-[var(--color-text-primary)] font-medium transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span>{faq.question}</span>{" "}
                    <span className="text-[var(--color-accent)] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all font-bold">
                      &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* INPUT */}
      <ChatInput
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
        disabled={!!selectedFAQ}
        suggestions={suggestions}
        onSelectTopSuggestion={() => {
          if (suggestions.length > 0) handleSelectFAQ(suggestions[0]);
        }}
      />
    </motion.div>
  );
}

// 4. MAIN EXPORT (Floating Stack & Chat Logic)
export default function FloatingButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showInstagramTooltip, setShowInstagramTooltip] = useState(false);
  const [showChatbotTooltip, setShowChatbotTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isChatOpen) {
      html.style.overflow = "hidden";
      html.style.touchAction = "none";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      html.style.touchAction = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
    return () => {
      html.style.overflow = "";
      html.style.touchAction = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isChatOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsChatOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setIsChatOpen(false);
    };
    if (isChatOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isChatOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed right-6 z-[1000] flex flex-col items-end gap-4 select-none bottom-20 md:bottom-6"
    >
      {/* --- CHAT WINDOW CONTAINER --- */}
      <AnimatePresence>
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      {/* 
        ORDER: CHATBOT (Top) -> INSTAGRAM (Middle) -> WHATSAPP (Bottom)
      */}

      {/* 1. CHATBOT BUTTON */}
      <div className="flex items-center relative">
        <AnimatePresence>
          {showChatbotTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md hidden sm:block whitespace-nowrap"
            >
              Chat Support
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          onMouseEnter={() => setShowChatbotTooltip(true)}
          onMouseLeave={() => setShowChatbotTooltip(false)}
          aria-label={
            isChatOpen ? "Close Chatbot" : "Open Event Sathi Assistant"
          }
          className="w-11 h-11 md:w-14 md:h-14 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-[var(--color-accent)]/20 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* 2. INSTAGRAM BUTTON */}
      <div className="flex items-center relative">
        <AnimatePresence>
          {showInstagramTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md hidden sm:block whitespace-nowrap"
            >
              Follow saathi
            </motion.div>
          )}
        </AnimatePresence>
        <motion.a
          href="https://www.instagram.com/eventsaathi_official?"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowInstagramTooltip(true)}
          onMouseLeave={() => setShowInstagramTooltip(false)}
          className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
          style={{
            background:
              "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white w-5 h-5 md:w-6 md:h-6"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </motion.a>
      </div>

      {/* 3. WHATSAPP BUTTON */}
      {/* <div className="flex items-center relative">
        <AnimatePresence>
          {showWhatsAppTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md hidden sm:block whitespace-nowrap"
            >
              WhatsApp Support
            </motion.div>
          )}
        </AnimatePresence>
        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          className="w-11 h-11 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#20ba56] transition-colors duration-200"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          aria-label="WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="text-white w-5 h-5 md:w-7 md:h-7"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </motion.a>
      </div> */}
    </div>
  );
}
