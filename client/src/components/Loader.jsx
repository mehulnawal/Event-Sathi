"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#7B1223]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.img
            src="/assets/logo-placeholder.png"
            alt="Event Sathi"
            className="h-16 w-auto object-contain mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Tagline */}
          <motion.p
            className="text-[#C9973A] font-['Hind'] text-lg tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            हर Event का एक साथी
          </motion.p>
          {/* Gold loading bar */}
          <motion.div
            className="mt-10 h-[2px] bg-[#C9973A] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "140px" }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
