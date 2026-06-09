"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

// Reusable Counter Sub-Component for High Performance
function CountingElement({ targetValue, suffix = "" }) {
  const nodeRef = useRef(null);
  const motionValue = useMotionValue(0);
  const roundedValue = useTransform(motionValue, (latest) =>
    Math.round(latest),
  );
  const isInView = useInView(nodeRef, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, targetValue, {
        duration: 2.0,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [isInView, motionValue, targetValue]);

  // Keep rendering zero dynamically until the user scrolls it into view
  useEffect(() => {
    const unsubscribe = roundedValue.on("change", (latest) => {
      if (nodeRef.current) {
        nodeRef.current.textContent = `${latest}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [roundedValue, suffix]);

  return (
    <span
      ref={nodeRef}
      className="font-sans text-4xl font-extrabold text-[#C9973A] tracking-tight"
    >
      0{suffix}
    </span>
  );
}

export default function WhyChooseUsSection({ whyUsData = [] }) {
  return (
    <section
      id="why-us"
      className="bg-[#F5F0E8] py-16 md:py-20 lg:py-24 px-6 relative z-10 border-t border-[#C9973A]/20 "
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-sans text-[11px] font-bold tracking-[0.32em] text-[#C9973A] uppercase block mb-2">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-[#7B1223] font-serif leading-tight">
            Why Event Sathi?
          </h2>
          <div className="w-16 h-[2px] bg-[#C9973A]/40 mx-auto mt-4" />
        </div>

        {/* Dynamic Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 md:mt-12">
          {whyUsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#FDFAF5] border border-[#C9973A]/30 hover:border-[#C9973A]/70 rounded-2xl p-6 sm:p-8 relative shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* User Pain-point Quote */}
                <p className="font-sans text-sm text-[#8C7B6B] italic mb-3 opacity-90 leading-relaxed">
                  &ldquo;{item.pain}&rdquo;
                </p>

                {/* Platform Value Proposition Answer */}
                <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#7B1223] leading-snug mb-6 max-w-sm">
                  {item.answer}
                </h3>
              </div>

              {/* Data Counter Metrics Panel */}
              <div className="flex items-baseline gap-3 mt-4 border-t border-[#C9973A]/15 pt-4">
                <CountingElement
                  targetValue={Number(item.val) || 0}
                  suffix={item.suffix || ""}
                />

                <span className="font-sans text-[11px] text-[#8C7B6B] font-bold uppercase tracking-wider">
                  {item.metricLabel || "Trust Metric Baseline"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
