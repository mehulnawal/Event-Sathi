"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Consistent with your main page bundle

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Strictly enforcing your 2 seconds (2000ms) max constraint
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto select-none flex w-full h-full">
          {/* LEFT CURTAIN GATEWAY */}
          <motion.div
            className="w-1/2 h-full bg-[#7B1223] relative flex items-center justify-end"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }} // Custom cubic-bezier for liquid motion
          >
            {/* Fine Luxury Accent Line on edge */}
            <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9973A]/40 to-transparent" />
          </motion.div>

          {/* RIGHT CURTAIN GATEWAY */}
          <motion.div
            className="w-1/2 h-full bg-[#7B1223] relative flex items-center justify-start"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Fine Luxury Accent Line on edge */}
            <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C9973A]/40 to-transparent" />
          </motion.div>

          {/* OVERLAY FLOATING CONTENT (Always centered on screen above curtains) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Glowing Backdrop Radial Flare */}
            <motion.div
              className="absolute w-72 h-72 rounded-full bg-[#C9973A]/10 blur-[60px]"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Logo Wrapper with Shimmer / Scaling Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-50%" }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              >
                हर Event का एक साथी
              </motion.p>

              {/* Sleek Cinematic Accent Filament Line */}
              <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-[#C9973A] to-transparent mt-3"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "180px", opacity: 0.8 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
