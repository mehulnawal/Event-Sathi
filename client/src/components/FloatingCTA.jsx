"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showInstagramTooltip, setShowInstagramTooltip] = useState(false);

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-20 md:bottom-6 right-6 flex items-center z-[1000]">
        <AnimatePresence>
          {showWhatsAppTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md select-none hidden sm:block"
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
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="WhatsApp"
        >
          {/* Official WhatsApp Precise Path SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="text-white w-5 h-5 md:w-7 md:h-7"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </motion.a>
      </div>

      {/* Instagram Floating Button */}
      <div className="fixed bottom-34 md:bottom-24 right-6 z-50 flex items-center">
        <AnimatePresence>
          {showInstagramTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="mr-3 bg-[#1C1C1C] text-[#F5F0E8] text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-md select-none hidden sm:block"
            >
              Follow Sathi
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href="https://www.instagram.com/eventsaathi_official?"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowInstagramTooltip(true)}
          onMouseLeave={() => setShowInstagramTooltip(false)}
          className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-200"
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
    </>
  );
}
