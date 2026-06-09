"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

// 1. Parent se aa rahe onSubmitClick aur onBecomeVendorClick functions ko receive kiya
export default function HeroSection({ onSubmitClick, onBecomeVendorClick }) {
  useEffect(() => {
    const video = document.getElementById("cinematic-bg-video");
    if (video) {
      video.playbackRate = 0.85;
    }
  }, []);

  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Cinematic Background Video Track */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          id="cinematic-bg-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          className="w-full h-full object-cover object-[80%_center] md:object-center scale-100"
          poster="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Ambient Overlay Veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#200e05] via-[#200e05]/95 via-[40%] lg:via-[20%] to-[#200e05]/20 opacity-100" />
      </div>

      {/* Main Content Deck Layout Grid */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center flex-grow px-6 md:px-12 lg:px-[72px] pt-32 md:pt-40 pb-24 md:pb-20">
        <div className="flex flex-col justify-center text-left max-w-2xl">
          {/* Top Elegant Gold Label */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-sans text-[10px] md:text-xs tracking-[0.25em] font-medium text-[#d7a24d] mb-4 md:mb-5 uppercase"
          >
            India's Trusted Event Partner
          </motion.p>

          {/* Core Masterpiece Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-serif font-normal leading-[1.08] text-[#fbf9f6] tracking-wide mb-6 drop-shadow-md"
          >
            Your Event.
            <br />
            Our Promise.
          </motion.h1>

          {/* Subtitle Explainer Summary */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-sm md:text-[15px] leading-relaxed text-[#f0e8dd] max-w-[440px] font-normal mb-8 md:mb-10 drop-shadow-sm"
          >
            Submit your requirements once. We connect you to the right vendors -
            fast, reliable, and personal.
          </motion.p>

          {/* Interactive Dual Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:max-w-md lg:max-w-full"
          >
            {/* BUTTON 1: Open Requirement Form */}
            <button
              onClick={onSubmitClick}
              className="px-6 py-3.5 rounded-md border border-[#c9973a]/80 bg-[#c9973a] text-[#200e05] font-sans text-sm tracking-wide font-medium hover:bg-[#d7a24d] active:scale-[0.99] transition-all duration-300 shadow-lg text-center cursor-pointer select-none"
            >
              Submit Your Requirement
            </button>

            {/* BUTTON 2: Open Vendor Form */}
            <button
              onClick={onBecomeVendorClick || onSubmitClick}
              className="px-6 py-3.5 rounded-md border border-[#c9973a]/40 bg-transparent text-white font-sans text-sm tracking-wide font-medium flex items-center justify-center gap-2 hover:border-[#c9973a]/80 hover:bg-white/5 active:scale-[0.99] transition-all duration-300 cursor-pointer select-none"
            >
              I'm a Vendor <span className="text-[#c9973a] text-base">→</span>
            </button>
          </motion.div>

          {/* Premium Numerical Statistics Grid Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 divide-x divide-[#c9973a]/30 gap-2 md:gap-4 pt-12 md:pt-16 lg:pt-20 border-t border-transparent w-full max-w-[480px]"
          >
            {/* Stat 1 */}
            <div className="flex flex-col pr-4">
              <span className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm">
                500+
              </span>
              <span className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light">
                Events Handled
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col px-4">
              <span className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm">
                200+
              </span>
              <span className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light">
                Verified Vendors
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col px-4">
              <span className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm">
                30 Min
              </span>
              <span className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light">
                Emergency Support
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Luxury Symmetrical Mughal Ornament Ribbon Strip */}
      <div className="absolute bottom-0 inset-x-0 w-full z-20 flex flex-col items-center pointer-events-none">
        <div
          className="relative w-48 sm:w-56 md:w-64 h-10 md:h-12 bg-[#3b1d0a] border-t border-x border-[#c9973a]/60 flex items-center justify-center"
          style={{
            clipPath:
              "polygon(0% 100%, 10% 25%, 25% 10%, 40% 5%, 50% 0%, 60% 5%, 75% 10%, 90% 25%, 100% 100%)",
            boxShadow: "0 -4px 25px rgba(0,0,0,0.4)",
          }}
        >
          <div className="text-[#c9973a]/90 text-xs sm:text-sm tracking-widest font-serif opacity-95 select-none pointer-events-none flex items-center justify-center gap-1 px-4 pt-2">
            <span className="text-[10px] md:text-xs">⚜</span>
            <span className="h-[1px] w-6 md:w-10 bg-gradient-to-r from-transparent to-[#c9973a]" />
            <span className="mx-1 text-xs md:text-sm">❦</span>
            <span className="h-[1px] w-6 md:w-10 bg-gradient-to-l from-transparent to-[#c9973a]" />
            <span className="text-[10px] md:text-xs">⚜</span>
          </div>
        </div>

        {/* Golden Bottom Accent Ribbon */}
        <div className="w-full h-1.5 md:h-2 bg-gradient-to-r from-[#200e05] via-[#c9973a] to-[#200e05] border-t border-[#d7a24d]/40 opacity-90" />
      </div>
    </section>
  );
}
