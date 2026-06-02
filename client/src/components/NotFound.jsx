"use client";

import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden select-none">
      {/* Decorative ambient background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#7B1223]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Editorial Layered 404 Badge */}
        <div className="relative mb-2">
          <p className="font-['Playfair_Display'] text-[140px] sm:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#7B1223]/20 to-[#7B1223]/5 selection:bg-transparent">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center top-6">
            <MapPin className="w-12 h-12 text-[#C9973A] animate-bounce" />
          </div>
        </div>

        {/* Dynamic Heading */}
        <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#7B1223] mb-4 tracking-wide">
          Route Not Found
        </h1>

        {/* Culturally on-brand microcopy */}
        <p className="font-['Inter'] text-sm sm:text-base text-[#8C7B6B] mb-8 max-w-sm sm:max-w-md leading-relaxed px-2">
          Looks like the{" "}
          <span className="text-[#7B1223] font-semibold">baarat</span> took an
          unplanned detour! Don't worry, let us get you back to the main
          pavilion.
        </p>

        {/* Action Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-[#7B1223] text-[#F5F0E8] border-2 border-transparent px-8 py-3.5 rounded-full font-['Inter'] font-bold text-sm uppercase tracking-wider hover:bg-[#9B1535] active:scale-95 transition-all duration-200 shadow-lg shadow-[#7B1223]/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      {/* Elegant Bottom Border Accent matching your main layout */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#C9973A] to-transparent opacity-60" />
    </div>
  );
}
