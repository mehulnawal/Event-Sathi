"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, User, Phone, MessageCircle, Mail, RotateCcw, Search, CornerDownLeft, HelpCircle, MessageSquare } from "lucide-react";
import Fuse from "fuse.js";

// ====================================
// 1. FAQ DATA ARRAY
// ====================================
const faqData = [
  {
    id: 1,
    question: "How do I register as a vendor on Event Sathi?",
    answer: "To register as a vendor, click on the 'Join as Vendor' button on our homepage. Fill out your business profile, service categories, pricing packages, and upload high-quality pictures of your past events. Our onboarding team will review and approve your profile within 24-48 hours.",
    keywords: ["vendor registration", "become vendor", "join vendor", "seller signup", "vendr", "register merchant"],
    popular: true
  },
  {
    id: 2,
    question: "What are the payment and booking terms?",
    answer: "Bookings are locked upon paying a partial advance token amount specified by the vendor via the Event Sathi platform. The remaining balance is handled directly with the vendor based on the milestone terms signed in the service contract. All booking logs are tracked safely in your dashboard.",
    keywords: ["payment", "bookingg", "advance money", "token amount", "price terms", "fees"],
    popular: true
  },
  {
    id: 3,
    question: "Can I cancel or reschedule a booked event?",
    answer: "Yes, cancellations and rescheduling depend strictly on the individual vendor's policy shown at the time of booking. Go to 'My Bookings', select the event, and check options. Any eligible refunds are processed into your native account within 5-7 business days.",
    keywords: ["cancel booking", "reschedule event", "change date", "refund money", "cancelation policy"],
    popular: false
  },
  {
    id: 4,
    question: "How does Event Sathi verify vendors?",
    answer: "Every partner on Event Sathi goes through a multi-step verification program including government identity checks, physical portfolio evaluation, and past client feedback analysis to ensure top-notch luxury standards for your premium events.",
    keywords: ["verify vendor", "trusted partners", "safe booking", "fraud check", "quality service"],
    popular: true
  },
  {
    id: 5,
    question: "Are there any hidden service fees or charges?",
    answer: "No, transparency is our core principle. The prices you see from verified vendors are all-inclusive of native taxes unless specified otherwise in their custom optional add-ons setup.",
    keywords: ["hidden charges", "extra fees", "service tax", "pricing cost", "commission"],
    popular: false
  },
  {
    id: 6,
    question: "How do I reach customer support if a vendor doesn't respond?",
    answer: "If a vendor fails to respond within 12 hours of a premium request, you can instantly escalate it by tapping our emergency helpline or mailing support@eventsathi.com. A dedicated Event Buddy will be assigned to resolve it.",
    keywords: ["support team", "no response", "complain vendor", "help desk", "customer care"],
    popular: true
  },
  {
    id: 7,
    question: "Can I book multiple vendors for a single wedding event?",
    answer: "Absolutely! You can use our centralized Event Sathi Cart feature to select separate vendors for catering, photography, decoration, and music, managing them under a unified single master timeline dashboard.",
    keywords: ["multiple vendors", "wedding planning", "catering photo package", "cart system", "partnr"],
    popular: true
  }
];

// ====================================
// 2. FUZZY SEARCH UTILITY (FUSE.JS)
// ====================================
const fuseOptions = {
  keys: [
    { name: "question", weight: 0.6 },
    { name: "keywords", weight: 0.4 }
  ],
  threshold: 0.35,
  distance: 100,
  ignoreLocation: true
};

let fuseInstance = null;
const searchFAQs = (query, data) => {
  if (!query || query.trim() === "") return [];
  if (!fuseInstance) {
    fuseInstance = new Fuse(data, fuseOptions);
  }
  const results = fuseInstance.search(query);
  return results.map(result => result.item).slice(0, 5);
};

// ====================================
// 3. SUB-COMPONENTS
// ====================================

// --- CHAT MESSAGE COMPONENT ---
function ChatMessage({ type, text }) {
  const isBot = type === "bot";
  return (
    <div className={`flex items-start gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center shrink-0 border border-[var(--color-accent)]/30 shadow-xs">
          <Bot className="w-3.5 h-3.5" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm shadow-xs leading-relaxed whitespace-pre-line ${
          isBot
            ? "bg-white text-[var(--color-text-primary)] border border-[var(--color-accent)]/15 rounded-tl-none"
            : "bg-[var(--color-primary)] text-white rounded-tr-none"
        }`}
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

// --- SUGGESTION LIST COMPONENT ---
function SuggestionList({ items, onSelect, highlight }) {
  const highlightText = (text, target) => {
    if (!target) return text;
    const parts = text.split(new RegExp(`(${target})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === target.toLowerCase() ? (
            <span key={i} className="text-[var(--color-primary)] font-bold underline bg-[var(--color-accent)]/10">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest px-1 mb-1">
        💡 Suggested Results (Fuzzy matched)
      </div>
      <div className="flex flex-col gap-1.5">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="w-full text-left p-3 text-xs md:text-sm bg-white/50 hover:bg-white border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40 rounded-xl text-[var(--color-text-primary)] transition-all cursor-pointer flex items-start gap-2.5 group hover:shadow-xs focus:ring-1 focus:ring-[var(--color-accent)] focus:outline-none"
          >
            <HelpCircle className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0 opacity-70 group-hover:opacity-100" />
            <span className="font-medium leading-normal">
              {highlightText(item.question, highlight)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// --- CHAT INPUT COMPONENT ---
function ChatInput({ value, onChange, onClear, disabled, suggestions, onSelectTopSuggestion }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled && suggestions.length > 0) {
      e.preventDefault();
      onSelectTopSuggestion();
    }
  };

  return (
    <div className="p-3 bg-white border-t border-[var(--color-accent)]/20 flex items-center relative">
      <div className="absolute left-6 text-[var(--color-text-muted)]">
        <Search className="w-4 h-4 opacity-70" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={disabled ? "Click back button to search..." : value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type keyword (e.g., vendr, bookingg)..."
        className="w-full pl-9 pr-12 py-2.5 bg-[var(--color-bg)]/50 border border-[var(--color-accent)]/20 rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/70 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        aria-label="Search FAQs"
      />
      {value && !disabled && (
        <button
          onClick={onClear}
          className="absolute right-12 text-[var(--color-text-muted)] hover:text-[var(--color-emergency)] cursor-pointer p-1"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
      <div className="absolute right-6 flex items-center text-[var(--color-text-muted)] opacity-40 pointer-events-none">
        <CornerDownLeft className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

// --- CHAT WINDOW COMPONENT ---
function ChatWindow({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    return searchFAQs(debouncedQuery, faqData);
  }, [debouncedQuery]);

  const popularFAQs = useMemo(() => {
    return faqData.filter(item => item.popular).slice(0, 6);
  }, []);

  const handleSelectFAQ = (faq) => {
    setSelectedFAQ(faq);
    setSearchQuery("");
  };

  const handleReset = () => {
    setSelectedFAQ(null);
    setSearchQuery("");
  };

  const hasNoResults = debouncedQuery.length > 1 && suggestions.length === 0 && !selectedFAQ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-[360px] sm:w-[400px] h-[520px] max-h-[80vh] bg-[var(--color-bg)] rounded-2xl border border-[var(--color-accent)]/30 shadow-2xl flex flex-col overflow-hidden"
    >
      {/* HEADER BAR */}
      <div className="bg-[var(--color-primary)] p-4 flex items-center justify-between border-b border-[var(--color-accent)]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-accent)]/40">
            <Bot className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-white font-['Playfair_Display'] font-bold text-base leading-tight tracking-wide">
              Event Sathi Assistant
            </h3>
            <p className="text-stone-300 text-xs">
              Ask anything about Event Sathi
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-stone-300 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
          aria-label="Close window"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CHAT BODY CONTAINER */}
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
                  className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] border border-[var(--color-primary)]/20 hover:border-[var(--color-accent)]/50 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer bg-white/40 shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Back to Questions
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
                Sorry, I couldn't find a relevant answer for "{debouncedQuery}".
              </p>
              <div className="p-3.5 bg-white/60 rounded-xl border border-[var(--color-accent)]/20 inline-block mx-4">
                <p className="text-[var(--color-text-muted)] text-xs mb-3 font-semibold uppercase tracking-wider">
                  Please contact our team directly:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:+919999999999"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-[var(--color-primary)] border border-[var(--color-accent)]/30 rounded-lg text-[var(--color-primary)] hover:text-white transition-all group shadow-sm text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Call</span>
                  </a>
                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-emerald-600 border border-[var(--color-accent)]/30 rounded-lg text-emerald-600 hover:text-white transition-all group shadow-sm text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[10px] font-bold">WhatsApp</span>
                  </a>
                  <a
                    href="mailto:support@eventsathi.com"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 bg-[var(--color-bg)] hover:bg-[var(--color-accent)] border border-[var(--color-accent)]/30 rounded-lg text-[var(--color-accent)] hover:text-white transition-all group shadow-sm text-center"
                  >
                    <Mail className="w-4 h-4" />
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
                    className="w-full text-left p-3 text-xs md:text-sm bg-white/70 hover:bg-white border border-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/50 rounded-xl text-[var(--color-text-primary)] font-medium transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-between group"
                  >
                    <span>{faq.question}</span>
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

      {/* FOOTER INPUT */}
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

// --- CHAT BUBBLE COMPONENT ---
function ChatBubble({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={isOpen ? "Close Chatbot" : "Open Event Sathi Assistant"}
      className="w-14 h-14 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-full shadow-xl flex items-center justify-center cursor-pointer border border-[var(--color-accent)]/20 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      whileHover={{ y: -2 }}
      animate={{ y: [0, -4, 0] }}
      transition={{
        animate: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close-icon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 stroke-[2]" />
          </motion.div>
        ) : (
          <motion.div
            key="chat-icon"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageSquare className="w-6 h-6 stroke-[2]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ====================================
// 4. MAIN EXPORT COMPONENT
// ====================================
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on clicking outside container area
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
}