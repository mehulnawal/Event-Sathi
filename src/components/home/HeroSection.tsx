"use client";

import { motion } from "framer-motion";
import { heroVideo } from "@/lib/media";
import Button from "@/components/ui/Button";
import { ChevronDown, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Video background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            src={heroVideo}
          />
        ) : (
          <motion.div
            className="h-full w-full bg-[#050508]"
            animate={{
              background: [
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 60%), #050508",
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 60%), #050508",
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.12) 0%, transparent 60%), #050508",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
              animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="h-[500px] w-[500px] rounded-full border border-amber-500/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute h-[700px] w-[700px] rounded-full border border-violet-500/10"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <Play className="h-10 w-10 text-amber-400/60" fill="currentColor" />
              </div>
              <p className="absolute bottom-[42%] text-xs text-zinc-600">
                Add hero video to media.ts
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-[#030306]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-5 pt-24 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Event Operations Platform
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Build Your Event Team{" "}
          <span className="gradient-text">in Minutes</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Instantly assemble crews for weddings, concerts, corporate events &
          productions. Managers, anchors, decorators, sound — all in one
          marketplace.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <Button href="/#build-team" size="lg">
            Book Event Crew
          </Button>
          <Button href="/vendor" variant="secondary" size="lg">
            Become Event Manager
          </Button>
          <Button href="/browse" variant="ghost" size="lg">
            Explore Services →
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[
            { value: "2.8K+", label: "Vendors" },
            { value: "30min", label: "Emergency" },
            { value: "50+", label: "Cities" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                {stat.value}
              </p>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#build-team"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-zinc-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
