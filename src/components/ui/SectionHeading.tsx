"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  gradient?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  gradient = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInUp}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
    >
      {label && (
        <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ${gradient ? "gradient-text" : "text-white"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
