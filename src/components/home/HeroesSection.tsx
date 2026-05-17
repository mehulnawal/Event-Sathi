"use client";

import { motion } from "framer-motion";
import { teamImage } from "@/lib/media";
import { ImageIcon } from "lucide-react";

export default function HeroesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-amber-400">
              The People
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Heroes Behind Events.{" "}
              <span className="gradient-text">Powered by Event Sathi.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Every flawless wedding, every electric concert, every seamless
              corporate gala — built by crews who show up, execute, and deliver.
              We connect the talent behind the magic.
            </p>
            <motion.div
              className="mt-8 flex gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { n: "2,800+", l: "Verified Pros" },
                { n: "4,800+", l: "Events Executed" },
                { n: "4.8★", l: "Avg Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl font-bold text-white">{s.n}</p>
                  <p className="text-xs text-zinc-500">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 to-violet-500/20 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
              {teamImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teamImage}
                  alt="Event team"
                  className="h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
                      "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
                      "linear-gradient(135deg, #18181b 0%, #09090b 100%)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <ImageIcon className="h-16 w-16 text-zinc-700" />
                  <p className="mt-4 text-sm text-zinc-600">
                    Add teamImage to media.ts
                  </p>
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating cards */}
            <motion.div
              className="absolute -left-4 bottom-8 glass-strong rounded-2xl p-4 md:-left-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <p className="text-xs text-zinc-500">Crew deployed</p>
              <p className="font-display text-xl font-bold text-amber-400">847</p>
              <p className="text-xs text-zinc-600">this month</p>
            </motion.div>
            <motion.div
              className="absolute -right-4 top-8 glass-strong rounded-2xl p-4 md:-right-8"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <p className="text-xs text-zinc-500">Avg response</p>
              <p className="font-display text-xl font-bold text-violet-400">12min</p>
              <p className="text-xs text-zinc-600">emergency</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
