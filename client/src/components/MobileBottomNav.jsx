"use client";

import React from "react";
import { motion } from "motion/react";
import { Home, AlertCircle } from "lucide-react";

export default function MobileBottomNav({ onSubmitClick, onEmergencyClick }) {
  const handleScrollToHero = (e) => {
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#F5F0E8] border-t-2 border-[#C9973A] px-4 py-3 pb-safe shadow-[0_-10px_25px_rgba(0,0,0,0.1)]"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {/* Home Navigation
        <a
          href="#hero"
          onClick={handleScrollToHero}
          className="flex flex-col items-center justify-center gap-1 min-w-[60px] group bg-transparent border-0 cursor-pointer text-decoration-none"
          aria-label="Scroll to Home"
        >
          <Home className="w-5 h-5 text-[#7B1223] transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
          <span className="text-[10px] font-['Inter'] font-semibold text-[#7B1223] tracking-wide">
            Home
          </span>
        </a> */}

        {/* Emergency Hotline (Tatkal) */}
        <button
          onClick={onEmergencyClick}
          className="flex flex-row gap-2 items-center justify-center bg-[#7B1223] border-2 border-[#C9973A]/40 text-[#F5F0E8] px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#9B1535] active:scale-95 transition-all duration-200 shadow-md font-['Inter'] font-semibold text-xs "
          aria-label="Get Emergency Backup"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D94F3D] animate-ping opacity-75" />
            <AlertCircle className="w-5 h-5 text-[#D94F3D] transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
          </div>
          <span className="text-[10px] font-['Inter'] font-semibold text-white tracking-wide mt-0.5">
            Emergency
          </span>
        </button>

        {/* Primary Requirement CTA */}
        <button
          className="flex flex-col items-center justify-center border-[#7B1223] border-1 px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#9B1535] active:scale-95 transition-all duration-200 shadow-md font-['Inter'] font-semibold text-xs"
          onClick={onSubmitClick}
        >
          Submit Requirement
        </button>
      </div>
    </motion.nav>
  );
}
