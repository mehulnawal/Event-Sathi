"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    image: "./assets/GuestManagement.png",
    title: "Guest Management & Hospitality",
    points: [
      "Guest receiving, welcoming & escorting",
      "VIP guest assistance & hospitality counter",
      "Managing crowd flow during rituals & events",
    ],
  },
  {
    id: "02",
    image: "./assets/ShadowService.png",
    title: "Shadow Service for Bride & Groom",
    points: [
      "Dedicated personal assistant for bride/groom",
      "Outfit assistance & essentials management",
      "Coordinating entry, exit & procession timing",
    ],
  },
  {
    id: "03",
    image: "/assets/RitualManagement.png",
    title: "Ritual Management",
    points: [
      "Coordinating with pandit & managing timings",
      "Setting up ritual space & required items",
      "Ensuring family presence for all ceremonies",
    ],
  },
  {
    id: "04",
    image: "/assets/VendorManagement.png",
    title: "Vendor Management",
    points: [
      "Pre-event vendor coordination & setup",
      "Managing photographer, DJ, decor & caterer",
      "Ensuring all vendors stay on schedule",
    ],
  },
  {
    id: "05",
    image: "/assets/FoodManagement.png",
    title: "Food & Beverages Management",
    points: [
      "Coordinating with caterer for setup & timing",
      "Monitoring buffet counters & VIP table service",
      "Managing water, beverages & late-night service",
    ],
  },
  {
    id: "06",
    image: "/assets/ValetManagement.png",
    title: "Valet Management",
    points: [
      "Managing vehicle arrival, departure & parking",
      "Token/parking slip system coordination",
      "Organized parking flow during peak hours",
    ],
  },

  {
    id: "07",
    image: "/assets/photography.png",
    title: "Photography & Videography Coordination",
    points: [
      "Coordinating photographer & videographer timings",
      "Ensuring all key moments & rituals are captured",
      "Managing shot lists, positions & family groupings",
    ],
  },
  {
    id: "08",
    image: "/assets/nannyService.png",
    title: "Nanny for Kids / Play Areas",
    points: [
      "Dedicated caretakers for children during the event",
      "Supervised play areas to keep kids safe & engaged",
      "Allowing parents to enjoy the event stress-free",
    ],
  },
];

export default function Services() {
  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <section
      id="services"
      className="bg-[#F5F0E8] py-20 px-5 md:px-8 relative z-10 overflow-hidden font-['Inter']"
    >
      {/* Global CSS injection to hide scrollbars on scrollable areas smoothly */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* === DECORATIVE SIDE ELEMENTS === */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9973A]/50" />
          <div className="w-2 h-2 rounded-full bg-[#C9973A]/60" />
          <div className="w-px h-24 bg-gradient-to-b from-[#C9973A]/50 to-transparent" />
        </div>
      </div>

      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9973A]/50" />
          <div className="w-2 h-2 rounded-full bg-[#C9973A]/60" />
          <div className="w-px h-24 bg-gradient-to-b from-[#C9973A]/50 to-transparent" />
        </div>
      </div>

      <div className="absolute top-8 right-8 font-['Playfair_Display'] text-[120px] font-bold text-[#7B1223]/4 leading-none select-none pointer-events-none hidden lg:block">
        ES
      </div>

      <div className="absolute bottom-8 left-8 font-['Playfair_Display'] text-[120px] font-bold text-[#7B1223]/4 leading-none select-none pointer-events-none hidden lg:block">
        06
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9973A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* === SECTION HEADER === */}
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-[#C9973A] uppercase block mb-3">
            What We Offer
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#7B1223] mb-4">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-[#C9973A]/50 mx-auto" />
        </motion.div>

        {/* === CARDS GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-[240px] md:h-[320px]"
              style={{ perspective: "1000px" }}
              onClick={() => setFlippedCard(flippedCard === idx ? null : idx)}
            >
              {/* Inner flipper */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform:
                    flippedCard === idx ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT FACE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/20 to-transparent" />

                    <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest text-[#C9973A] uppercase">
                      {service.id} / 08
                    </span>

                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#C9973A] flex items-center justify-center bg-[#1C1C1C]/40">
                      <span className="text-[#C9973A] text-lg font-light leading-none">
                        +
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-['Playfair_Display'] text-base md:text-lg font-bold text-[#F5F0E8] leading-snug mb-2">
                        {service.title}
                      </h3>
                      <p className="text-[10px] font-semibold tracking-widest text-[#C9973A] uppercase">
                        Tap to explore →
                      </p>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-[#7B1223] border border-[#C9973A]/30 flex flex-col justify-between p-5 md:p-6">
                    {/* Close indicator */}
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold tracking-widest text-[#C9973A] uppercase">
                        {service.id} / 08
                      </span>
                      <div className="w-7 h-7 rounded-full border border-[#C9973A]/50 flex items-center justify-center">
                        <span className="text-[#C9973A] text-sm">×</span>
                      </div>
                    </div>

                    {/* Scrollable Container Block for content overflow management */}
                    <div className="flex-1 my-3 overflow-y-auto no-scrollbar max-h-[165px] md:max-h-[210px] pr-1">
                      <h3 className="font-['Playfair_Display'] text-base md:text-xl font-bold text-[#F5F0E8] leading-snug mb-3">
                        {service.title}
                      </h3>

                      {/* Points List */}
                      <ul className="space-y-2 md:space-y-2.5">
                        {service.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 md:gap-3"
                          >
                            <span className="text-[#C9973A] font-bold text-xs md:text-sm mt-0.5 shrink-0">
                              ✓
                            </span>
                            <span className="text-xs md:text-sm text-[#F5F0E8]/85 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom gold line */}
                    <div className="w-10 h-0.5 bg-[#C9973A]/60 shrink-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
