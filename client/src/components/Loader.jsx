"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto select-none flex w-full h-full">
          {/* LEFT CURTAIN GATEWAY */}
          <motion.div
            className="w-1/2 h-full bg-[#7B1223] relative flex items-center justify-end"
            exit={{ x: "-100%" }}
            // SPEED UP: Reduced duration from 0.65s to 0.45s for a faster snap open
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9973A]/40 to-transparent" />
          </motion.div>

          {/* RIGHT CURTAIN GATEWAY */}
          <motion.div
            className="w-1/2 h-full bg-[#7B1223] relative flex items-center justify-start"
            exit={{ x: "100%" }}
            // SPEED UP: Reduced duration from 0.65s to 0.45s
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9973A]/40 to-transparent" />
          </motion.div>

          {/* OVERLAY FLOATING CONTENT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Glowing Backdrop Radial Flare */}
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-[#C9973A]/10 blur-[60px]"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Logo Wrapper */}
            <motion.div
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              {/* Premium Floating Ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-[#C9973A]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <img
                src="/assets/logo-placeholder.png"
                alt="Event Sathi Logo"
                className="h-16 md:h-20 w-auto object-contain relative z-20 filtering-gold drop-shadow-[0_4px_12px_rgba(201,151,58,0.2)]"
              />
            </motion.div>

            {/* Typography Canvas */}
            <div className="overflow-hidden mt-6 flex flex-col items-center">
              <motion.p
                className="text-[#C9973A] font-serif italic text-xl md:text-2xl font-medium tracking-wide relative z-20 text-center font-['Hind']"
                exit={{ opacity: 0, y: "-50%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                हर Event का एक साथी
              </motion.p>

              {/* Sleek Cinematic Accent Filament Line */}
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#C9973A] to-transparent mt-3 w-[180px]"
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
