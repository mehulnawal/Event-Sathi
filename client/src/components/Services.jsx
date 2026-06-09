"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Services({ onSubmitClick, servicesData = [] }) {
  const defaultServices = [
    {
      id: 1,
      name: "Premium Venues",
      desc: "Palatial estates, luxury heritage forts, and beachside resorts curated to frame your vows.",
      fallbackBg: "from-[#2A1115] to-[#1C1C1C]",
    },
    {
      id: 2,
      name: "Couture Decor & Scenography",
      desc: "Immersive structural design, bespoke lighting, and masterclass floral art down to the last candle.",
      fallbackBg: "from-[#1F2421] to-[#1C1C1C]",
    },
    {
      id: 3,
      name: "Cinematic Photography",
      desc: "Award-winning visual storytellers catching raw heirloom emotions in editorial frames.",
      fallbackBg: "from-[#1A1E29] to-[#1C1C1C]",
    },
    {
      id: 4,
      name: "Gourmet Catering",
      desc: "Curated multi-cuisine culinary theater ranging from traditional roots to modern gastronomy.",
      fallbackBg: "from-[#291A12] to-[#1C1C1C]",
    },
    {
      id: 5,
      name: "Artist & Entertainment",
      desc: "A-list live performers, orchestral ensembles, and customized nightlife experiences.",
      fallbackBg: "from-[#241229] to-[#1C1C1C]",
    },
    {
      id: 6,
      name: "Bridal Styling & Glam",
      desc: "Celebrity drapers, high-fashion makeup artists, and custom trousseau coordinators.",
      fallbackBg: "from-[#1E112A] to-[#1C1C1C]",
    },
  ];

  const data = servicesData.length > 0 ? servicesData : defaultServices;

  // Split data cleanly into two streams for mathematically perfect desktop columns
  const leftColumnItems = data.filter((_, i) => i % 2 === 0);
  const rightColumnItems = data.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="services"
      className="bg-[var(--color-bg)] py-5 sm:py-10 md:py-10 lg:py-10 px-4 sm:px-6 md:px-12 lg:px-[72px] relative z-10 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="mb-10 sm:mb-10 md:mb-10 text-center">
          <span className="font-body text-[11px] sm:text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] uppercase block mb-3 sm:mb-4">
            Curated Ecosystem
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] leading-[1.15] mb-6">
            Our Wedding Services
          </h2>
          <div className="w-16 h-[2px] bg-[var(--color-accent)] mb-6 margin-center mx-auto" />
          {/* <p className="font-body text-sm sm:text-base text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            A handpicked collective of premium service pairings structuralized
            to execute your custom luxury wedding production flawlessly.
          </p> */}
        </div>

        {/* --- DESKTOP VIEWPORT (Staggered Double Columns) --- */}
        <div className="hidden md:grid grid-cols-2 gap-x-12 lg:gap-x-16 items-start">
          {/* Column Left */}
          <div className="space-y-16 lg:space-y-24">
            {leftColumnItems.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index * 2 + 1}
                onClick={onSubmitClick} // Function attached here
                aspectRatio="aspect-[4/5]"
              />
            ))}
          </div>

          {/* Column Right (Offset by exactly pt-28 for clean zig-zag spacing) */}
          <div className="space-y-16 lg:space-y-24 pt-28">
            {rightColumnItems.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index * 2 + 2}
                onClick={onSubmitClick} // Function attached here
                aspectRatio="aspect-[4/5]"
              />
            ))}
          </div>
        </div>

        {/* --- MOBILE VIEWPORT (Smart Dynamic Layout, Fixed Forms Trigger) --- */}
        <div className="grid md:hidden grid-cols-2 gap-4 sm:gap-6">
          {data.map((service, index) => {
            const isHeroRow = index === 0 || index === 3;
            const gridClass = isHeroRow ? "col-span-2" : "col-span-1";
            const aspectClass = isHeroRow
              ? "h-[260px] sm:h-[320px]"
              : "h-[220px] sm:h-[280px]";

            return (
              <div
                key={service.id}
                onClick={onSubmitClick} // Full card block handle for reliable touch trigger
                className={`${gridClass} ${aspectClass} relative rounded-xl overflow-hidden cursor-pointer group active:scale-[0.99] transition-transform duration-300`}
              >
                {/* Background Layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.fallbackBg} opacity-150 z-0`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/50 to-transparent z-10" />

                {/* Text Layout */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end z-20">
                  <span className="font-body text-[10px] text-[var(--color-accent)] font-semibold tracking-wider block mb-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[var(--color-bg)]">
                    {service.name}
                  </h3>
                  {isHeroRow && (
                    <p className="font-body text-xs text-[var(--color-bg)]/70 mt-1 line-clamp-2 max-w-sm">
                      {service.desc}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-widest">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

{
  /* --- REUSABLE CARD INNER ENGINE FOR DESKTOP STABILITY --- */
}
function ServiceCard({ service, index, onClick, aspectRatio }) {
  return (
    <div
      onClick={onClick} // Triggers the prop directly up to Home shell state management cleanly
      className={`group relative ${aspectRatio} w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-[var(--color-dark)]`}
    >
      {/* Premium Cinematic Background Layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.fallbackBg} opacity-100 transition-transform duration-[1.2s] ease-out group-hover:scale-105 z-0`}
      />

      {/* Luxury Subtle Mesh Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px] z-10" />

      {/* Lighting Shadow Mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/30 to-transparent group-hover:from-[var(--color-primary)]/80 group-hover:via-[var(--color-primary)]/40 transition-colors duration-700 ease-in-out z-10" />

      {/* Numerical Counter */}
      <div className="absolute top-8 left-8 font-body text-xs font-semibold tracking-widest text-[var(--color-bg)]/30 group-hover:text-[var(--color-accent)]/60 transition-colors duration-300 z-20">
        {String(index).padStart(2, "0")}
      </div>

      {/* Floating Call-to-Action Indicator Ring */}
      <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-[var(--color-bg)] opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-20">
        <ArrowUpRight className="w-4 h-4 group-hover:text-[var(--color-accent)] transition-colors" />
      </div>

      {/* Text Deck Block */}
      <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-20">
        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--color-bg)] group-hover:text-[var(--color-accent)] transition-colors duration-300 ease-out">
          {service.name}
        </h3>

        {/* Animated Slide Drawer Mechanism */}
        <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
          <p className="font-body text-sm text-[var(--color-bg)]/75 mt-3 leading-relaxed">
            {service.desc}
          </p>
        </div>

        {/* Anchor Accent Line */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-body text-[11px] font-bold tracking-widest text-[var(--color-accent)] uppercase">
            Submit Requirement
          </span>
        </div>
      </div>
    </div>
  );
}
