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
  return (
    <section
      id="why-us"
      className="bg-[#F5F0E8] py-16 md:py-20 lg:py-24 px-6 relative z-10 border-t border-[#C9973A]/20 overflow-hidden"
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
        {/* Section header — left aligned */}
        <div className="mb-10 max-w-xl text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-[#C9973A] uppercase block mb-2">
            Our Promise
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#7B1223]">
            Why Choose <br className="sm:hidden" /> Event Saathi?
          </h2>
        </div>

        {/* Desktop Bento Grid (md and above) */}
        <div className="hidden md:grid grid-cols-3 gap-3 auto-rows-fr">
          {/* Card 01 - Wide & Short (Spans 2 cols, 1 row) */}
          <div className="md:col-span-2">
            <CardWrapper card={WHY_CARDS[0]} index={0} />
          </div>

          {/* Card 02 - Narrow & Tall (Spans 1 col, 2 rows) */}
          <div className="md:row-span-2">
            <CardWrapper card={WHY_CARDS[1]} index={1} />
          </div>

          {/* Card 03 - Narrow & Tall (Spans 1 col, 2 rows) */}
          <div className="md:row-span-2">
            <CardWrapper card={WHY_CARDS[2]} index={2} />
          </div>

          {/* Card 04 - Small Square (Spans 1 col, 1 row) */}
          <div>
            <CardWrapper card={WHY_CARDS[3]} index={3} />
          </div>

          {/* Card 05 - Wide & Short (Spans 2 cols, 1 row) */}
          <div className="md:col-span-2">
            <CardWrapper card={WHY_CARDS[4]} index={4} />
          </div>

          {/* Card 06 - Narrow & Tall (Spans 1 col, 2 rows) */}
          <div className="md:row-span-2">
            <CardWrapper card={WHY_CARDS[5]} index={5} />
          </div>
        </div>

        {/* Mobile Grid (below md) - Strict 2-column layout */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {/* Card 01 - Full Width */}
          <div className="col-span-2">
            <CardWrapper card={WHY_CARDS[0]} index={0} />
          </div>

          {/* Card 02 & Card 03 - Side by Side */}
          <div>
            <CardWrapper card={WHY_CARDS[1]} index={1} />
          </div>
          <div>
            <CardWrapper card={WHY_CARDS[2]} index={2} />
          </div>

          {/* Card 04 - Full Width */}
          <div className="col-span-2">
            <CardWrapper card={WHY_CARDS[3]} index={3} />
          </div>

          {/* Card 05 & Card 06 - Side by Side */}
          <div>
            <CardWrapper card={WHY_CARDS[4]} index={4} />
          </div>
          <div>
            <CardWrapper card={WHY_CARDS[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted Sub-Component to preserve performance and prevent redundant code replication
function CardWrapper({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#FDFAF5] border border-[#C9973A]/25 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-[#C9973A]/60 hover:shadow-md transition-all duration-300 h-full min-h-[160px]"
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
}
