"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Home,
  Users,
  Search,
  Zap,
  Headphones,
  BarChart3,
  CreditCard,
  Lock,
} from "lucide-react";

const flowSteps = [
  { icon: Home, label: "HOME", active: true },
  { icon: Users, label: "Build Your Event", active: true },
  { icon: Search, label: "Browse Professionals", active: true },
  { icon: Zap, label: "Instant Booking", active: false },
  { icon: Headphones, label: "Live Support", active: false },
  { icon: BarChart3, label: "Execution Tracking", active: false },
  { icon: CreditCard, label: "Payment & Reviews", active: false },
];

export default function FlowTimeline() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Platform Flow"
          title="From Idea to Execution"
          subtitle="See how Event Sathi takes you from planning to flawless delivery."
        />

        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-8 left-0 right-0 hidden h-px bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-transparent md:block" />

          <div className="flex gap-4 overflow-x-auto pb-4 md:gap-0 md:justify-between md:overflow-visible scrollbar-hide">
            {flowSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex min-w-[140px] flex-col items-center md:min-w-0 md:flex-1"
              >
                <motion.div
                  whileHover={{ scale: step.active ? 1.1 : 1 }}
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border transition-all ${
                    step.active
                      ? "border-amber-500/40 bg-amber-500/20 text-amber-400 glow-amber"
                      : "border-white/10 bg-white/5 text-zinc-600"
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                  {!step.active && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800">
                      <Lock className="h-2.5 w-2.5 text-zinc-500" />
                    </div>
                  )}
                </motion.div>

                <p
                  className={`mt-3 text-center text-xs font-semibold uppercase tracking-wide ${
                    step.active ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {step.label}
                </p>

                {!step.active && (
                  <span className="mt-1 text-[10px] text-zinc-600 text-center px-1">
                    coming in full platform
                  </span>
                )}

                {i < flowSteps.length - 1 && (
                  <span className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] text-amber-500/30 text-lg">
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
