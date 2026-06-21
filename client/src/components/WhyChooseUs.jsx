"use client";

import { motion } from "framer-motion";

const WHY_CARDS = [
  {
    id: "01",
    emoji: "🎯",
    title: "Trained & Professional Staff",
    desc: "Every team member is briefed, trained, and event-ready.",
  },
  {
    id: "02",
    emoji: "👤",
    title: "One Point of Contact",
    desc: "Your dedicated Event Captain handles everything, start to finish.",
  },
  {
    id: "03",
    emoji: "⚡",
    title: "Last-Minute Support",
    desc: "Need help 2 days before? We're available.",
  },
  {
    id: "04",
    emoji: "🎪",
    title: "Expertise Across Events",
    desc: "Weddings, corporates, concerts, exhibitions — we've done it all.",
  },
  {
    id: "05",
    emoji: "🤝",
    title: "Flexible Staffing",
    desc: "One captain or a full team — hire exactly what you need.",
  },
  {
    id: "06",
    emoji: "💛",
    title: "Guest-Centric Approach",
    desc: "Every guest interaction handled with care and professionalism.",
  },
];

export default function WhyChooseUsSection() {
  const renderCard = (index) => {
    const card = WHY_CARDS[index];
    if (!card) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="bg-[#FDFAF5] border border-[#C9973A]/25 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-[#C9973A]/60 hover:shadow-md transition-all duration-300 h-full min-h-[150px]"
      >
        {/* Faded background number */}
        <span className="absolute bottom-3 right-4 font-['Playfair_Display'] text-7xl font-bold text-[#7B1223]/6 select-none pointer-events-none leading-none">
          {card.id}
        </span>

        {/* Top Content */}
        <div>
          <span className="text-2xl mb-3 block">{card.emoji}</span>
          <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#7B1223] leading-snug mb-2">
            {card.title}
          </h3>
          <p className="text-xs text-[#4A3F35] leading-relaxed">{card.desc}</p>
        </div>

        {/* Bottom gold line accent */}
        <div className="w-8 h-0.5 bg-[#C9973A]/50 mt-4" />
      </motion.div>
    );
  };

  return (
    <section
      id="why-us"
      className="bg-[#F5F0E8] py-12 md:py-16 lg:py-20 px-6 relative z-10 overflow-hidden"
    >
      {/* Left side vertical text (Desktop only) */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 items-center gap-3 select-none pointer-events-none">
        <span className="w-12 h-px bg-[#C9973A]/40" />
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#C9973A]/60 uppercase whitespace-nowrap">
          Why Event Saathi
        </span>
        <span className="w-12 h-px bg-[#C9973A]/40" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-[#C9973A] uppercase block mb-2">
            Our Promise
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#7B1223]">
            Why Choose <br className="sm:hidden" /> Event Saathi?
          </h2>
        </div>

        {/* Main Clean Responsive Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-fr">
          {/* Card 01 - Desktop: Wide (2 Cols) | Mobile: Wide (2 Cols) */}
          <div className="col-span-2 md:col-span-2 md:row-span-1">
            {renderCard(0)}
          </div>

          {/* Card 02 - Desktop: Tall (2 Rows) | Mobile: Normal (1 Col) */}
          <div className="col-span-1 md:col-span-1 md:row-span-2">
            {renderCard(1)}
          </div>

          {/* Card 03 - Desktop: Tall (2 Rows) | Mobile: Normal (1 Col) */}
          <div className="col-span-1 md:col-span-1 md:row-span-2">
            {renderCard(2)}
          </div>

          {/* Card 04 - Desktop: Standard | Mobile: Wide (2 Cols) */}
          <div className="col-span-2 md:col-span-1 md:row-span-1">
            {renderCard(3)}
          </div>

          {/* Card 05 - Desktop: Wide (2 Cols) | Mobile: Normal (1 Col) */}
          <div className="col-span-1 md:col-span-2 md:row-span-1">
            {renderCard(4)}
          </div>

          {/* Card 06 - Desktop: Tall (2 Rows) | Mobile: Normal (1 Col) */}
          <div className="col-span-1 md:col-span-1 md:row-span-2">
            {renderCard(5)}
          </div>
        </div>
      </div>
    </section>
  );
}
