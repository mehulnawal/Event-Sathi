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
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="bg-[#FDFAF5] border border-[#C9973A]/25 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-[#C9973A]/60 hover:shadow-md transition-all duration-300 h-full"
      >
        {/* Faded background number */}
        <span className="absolute bottom-3 right-4 font-['Playfair_Display'] text-7xl font-bold text-[#7B1223]/5 select-none pointer-events-none leading-none">
          {card.id}
        </span>

        <div>
          <span className="text-2xl mb-3 block">{card.emoji}</span>
          <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#7B1223] leading-snug mb-2">
            {card.title}
          </h3>
          <p className="text-xs text-[#4A3F35] leading-relaxed">{card.desc}</p>
        </div>

        <div className="w-8 h-0.5 bg-[#C9973A]/50 mt-4" />
      </motion.div>
    );
  };

  return (
    <section className="bg-[#F5F0E8] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="uppercase tracking-[0.32em] text-[#C9973A] text-[10px] md:text-xs font-bold block mb-3">
            Our Premium Edge
          </span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#7B1223]">
            Why Choose <br className="sm:hidden" /> Event Saathi?
          </h2>
        </div>

        {/* Desktop Grid Layout (md and above) */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "200px 200px 200px",
            gridTemplateAreas: `
              "c0 c1 c1"
              "c0 c2 c3"
              "c4 c4 c5"
            `,
            gap: "12px",
            alignItems: "stretch",
          }}
        >
          <div style={{ gridArea: "c0", height: "100%" }}>{renderCard(0)}</div>
          <div style={{ gridArea: "c1", height: "100%" }}>{renderCard(1)}</div>
          <div style={{ gridArea: "c2", height: "100%" }}>{renderCard(2)}</div>
          <div style={{ gridArea: "c3", height: "100%" }}>{renderCard(3)}</div>
          <div style={{ gridArea: "c4", height: "100%" }}>{renderCard(4)}</div>
          <div style={{ gridArea: "c5", height: "100%" }}>{renderCard(5)}</div>
        </div>

        {/* Mobile Grid Layout (below md) */}
        <div
          className="grid md:hidden"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: `
              "c0 c0"
              "c1 c2"
              "c3 c3"
              "c4 c5"
            `,
            gap: "10px",
          }}
        >
          <div style={{ gridArea: "c0", height: "100%" }}>{renderCard(0)}</div>
          <div style={{ gridArea: "c1", height: "100%" }}>{renderCard(1)}</div>
          <div style={{ gridArea: "c2", height: "100%" }}>{renderCard(2)}</div>
          <div style={{ gridArea: "c3", height: "100%" }}>{renderCard(3)}</div>
          <div style={{ gridArea: "c4", height: "100%" }}>{renderCard(4)}</div>
          <div style={{ gridArea: "c5", height: "100%" }}>{renderCard(5)}</div>
        </div>
      </div>
    </section>
  );
}
