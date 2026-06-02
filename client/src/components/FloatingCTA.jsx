"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showInstagramTooltip, setShowInstagramTooltip] = useState(false);

  return (
    <>
      {/* WhatsApp Floating Button */}{" "}
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-center z-[1000]">
        {" "}
        <AnimatePresence>
          {showWhatsAppTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md select-none"
            >
              WhatsApp Support
            </motion.div>
          )}{" "}
        </AnimatePresence>
        <motion.a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowWhatsAppTooltip(true)}
          onMouseLeave={() => setShowWhatsAppTooltip(false)}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="text-white"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.896 7.896 0 0 0-2.327-5.594Z" />
          </svg>
        </motion.a>
      </div>
      {/* Instagram Floating Button */}
      <div className="fixed bottom-38 md:bottom-24 right-6 z-50 flex items-center">
        <AnimatePresence>
          {showInstagramTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md select-none"
            >
              Follow Sathi
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://instagram.com/eventsathi"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowInstagramTooltip(true)}
          onMouseLeave={() => setShowInstagramTooltip(false)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          style={{
            background:
              "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </motion.a>
      </div>
    </>
  );
}
