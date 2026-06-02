import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function PremiumIndianEventHero() {
  useEffect(() => {
    const video = document.getElementById("cinematic-bg-video");
    if (video) {
      video.playbackRate = 0.85; // Elegant slow-motion flow

      // Force programmatic play to override browser engine restrictions
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay engine safe-catch executed:", error);
          // Fallback toggle just in case browser is hyper-aggressive
          video.muted = true;
          video.play();
        });
      }
    }
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] md:h-[95vh] lg:h-[100vh] bg-[#3b1d0a] overflow-hidden flex flex-col justify-between select-none">
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          id="cinematic-bg-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          className="w-full h-full object-cover object-center scale-100"
          // poster="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1600"
        >
          {/* Direct stream loopable luxury Indian festive palace backdrop */}
          <source src="/assets/hero-video.MP4" type="video/mp4" />
        </video>

        {/* REFINED OVERLAYS: Balanced golden lighting with crisp text readability */}
        {/* Left side vignette shadow panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#200e05]/85 via-[#3b1d0a]/45 to-transparent mix-blend-multiply" />

        {/* Warm Golden Sunset Ambience Amber Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#200e05]/60 via-[rgba(201,151,58,0.12)] to-black/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[rgba(88,42,8,0.15)] mix-blend-color-burn" />
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* CONTENT LAYER (DESKTOP SPLIT: ~43% LEFT CONTENT PANEL OVERLAY)       */}
      {/* ---------------------------------------------------------------------- */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col justify-between flex-grow px-6 md:px-12 lg:px-[72px] pt-12 md:pt-20 lg:pt-24 pb-20 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 h-full items-center w-full gap-8 lg:gap-0">
          {/* Left Panel: Luxury Typography and Actions */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-4 flex flex-col justify-center text-left h-full">
            {/* Top Label */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-sans text-[10px] md:text-xs tracking-[0.25em] font-medium text-[#d7a24d] mb-4 md:mb-5 uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              India's Trusted Event Partner
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="text-[42px] sm:text-[54px] md:text-[68px] lg:text-[72px] font-serif font-normal leading-[1.08] text-[#fbf9f6] tracking-wide mb-6 drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your Event.
              <br />
              Our Promise.
            </motion.h1>

            {/* Body Text Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="font-sans text-sm md:text-[15px] leading-relaxed text-[#f0e8dd] max-w-[440px] font-light mb-8 md:mb-10 drop-shadow-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Submit your requirements once. We connect you to the right vendors
              - fast, reliable, and personal.
            </motion.p>

            {/* Side-by-Side Luxury Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:max-w-md lg:max-w-full"
            >
              <button className="px-6 py-3.5 rounded-md border border-[#c9973a]/80 bg-[#200e05]/30 backdrop-blur-xs text-white font-sans text-sm tracking-wide font-medium hover:border-[#d7a24d] hover:bg-[#c9973a]/20 active:scale-[0.99] transition-all duration-300 shadow-lg text-center cursor-pointer">
                Submit Your Requirement
              </button>

              <button className="px-6 py-3.5 rounded-md border border-[#c9973a]/40 bg-transparent text-white font-sans text-sm tracking-wide font-medium flex items-center justify-center gap-2 hover:border-[#c9973a]/80 hover:bg-white/5 active:scale-[0.99] transition-all duration-300 cursor-pointer">
                I'm a Vendor <span className="text-[#c9973a] text-base">→</span>
              </button>
            </motion.div>

            {/* ------------------------------------------------------------------ */}
            {/* BOTTOM STATS SECTION                                               */}
            {/* ------------------------------------------------------------------ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-3 gap-2 md:gap-4 pt-12 md:pt-16 lg:pt-20 border-t border-transparent w-full max-w-[480px]"
            >
              {/* Stat 1 */}
              <div className="flex flex-col">
                <span
                  className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  500+
                </span>
                <span
                  className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Events Handled
                </span>
              </div>

              {/* Vertical Divider Line */}
              <div className="border-l border-[#c9973a]/30 h-10 my-auto mx-auto" />

              {/* Stat 2 */}
              <div className="flex flex-col pl-2">
                <span
                  className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  200+
                </span>
                <span
                  className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Verified Vendors
                </span>
              </div>

              {/* Vertical Divider Line */}
              <div className="border-l border-[#c9973a]/30 h-10 my-auto mx-auto" />

              {/* Stat 3 */}
              <div className="flex flex-col pl-2">
                <span
                  className="text-2xl md:text-[28px] font-serif font-medium text-[#d7a24d] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  30 Min
                </span>
                <span
                  className="text-[10px] md:text-xs text-[#dfd5c6] mt-1 uppercase tracking-wider font-light"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Emergency Support
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual Area: Center Play Button placement */}
          <div className="col-span-1 lg:col-span-5 xl:col-span-6 relative h-40 lg:h-full flex items-center justify-start lg:pl-12">
            {/* FLOATING CIRCULAR PLAY BUTTON */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.06 }}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#c9973a]/90 flex items-center justify-center cursor-pointer bg-[#200e05]/15 backdrop-blur-xs group transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(201,151,58,0.5)]"
            >
              {/* Soft Inner Pulse Glow */}
              <div className="absolute inset-0 rounded-full border border-[#d7a24d]/40 animate-ping opacity-60" />

              {/* Pure Elegant Golden Play Triangle SVG */}
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#d7a24d] fill-current transform translate-x-0.5 group-hover:text-[#fbf9f6] transition-colors duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* BOTTOM ORNAMENT / DECORATIVE LUXURY SECTION                            */}
      {/* ---------------------------------------------------------------------- */}
      <div className="absolute bottom-0 inset-x-0 w-full z-20 flex flex-col items-center">
        {/* Luxury Mughal Inspired Center Royal Arch/Badge */}
        <div
          className="relative w-48 sm:w-56 md:w-64 h-10 md:h-12 bg-[#3b1d0a] border-t border-x border-[#c9973a]/60 flex items-center justify-center"
          style={{
            clipPath:
              "polygon(0% 100%, 10% 25%, 25% 10%, 40% 5%, 50% 0%, 60% 5%, 75% 10%, 90% 25%, 100% 100%)",
            boxShadow: "0 -4px 25px rgba(0,0,0,0.4)",
          }}
        >
          {/* Symmetrical Ornamental Filigree Vector Graphics Overlay */}
          <div className="text-[#c9973a]/90 text-xs sm:text-sm tracking-widest font-serif opacity-95 select-none pointer-events-none flex items-center justify-center gap-1 px-4 pt-2">
            <span className="text-[10px] md:text-xs">⚜</span>
            <span className="h-[1px] w-6 md:w-10 bg-gradient-to-r from-transparent to-[#c9973a]" />
            <span className="mx-1 text-xs md:text-sm">❦</span>
            <span className="h-[1px] w-6 md:w-10 bg-gradient-to-l from-transparent to-[#c9973a]" />
            <span className="text-[10px] md:text-xs">⚜</span>
          </div>
        </div>

        {/* Thin Luxury Border Ribbon Strip across full width */}
        <div className="w-full h-1.5 md:h-2 bg-gradient-to-r from-[#200e05] via-[#c9973a] to-[#200e05] border-t border-[#d7a24d]/40 opacity-90" />
      </div>
    </section>
  );
}
