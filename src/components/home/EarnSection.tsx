"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { staggerContainer, scaleIn } from "@/lib/animations";
import {
  Mic2,
  Palette,
  Clapperboard,
  Users,
  Music,
  Sparkles,
} from "lucide-react";

const roles = [
  { icon: Users, label: "Event Managers", color: "text-amber-400" },
  { icon: Mic2, label: "Anchors", color: "text-violet-400" },
  { icon: Palette, label: "Decorators", color: "text-pink-400" },
  { icon: Clapperboard, label: "Production Crew", color: "text-cyan-400" },
  { icon: Music, label: "Artists & DJs", color: "text-emerald-400" },
  { icon: Sparkles, label: "Freelancers", color: "text-orange-400" },
];

export default function EarnSection() {
  return (
    <section className="section-padding relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none"
      />

      <motion.div
        className="relative mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div variants={scaleIn} className="text-center mb-12">
          <span className="mb-4 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
            For Professionals
          </span>
          <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
            Earn With <span className="gradient-text-violet">Event Sathi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Join India&apos;s fastest-growing event marketplace. Get discovered.
            Get booked. Get paid.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
          variants={staggerContainer}
        >
          {roles.map(({ icon: Icon, label, color }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-colors hover:border-violet-500/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <span className="text-sm font-medium text-zinc-300">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="mt-12 flex justify-center"
        >
          <Button href="/vendor" variant="violet" size="lg">
            Join the Network
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
