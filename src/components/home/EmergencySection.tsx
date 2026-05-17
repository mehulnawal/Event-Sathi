"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { AlertTriangle, Clock, Zap } from "lucide-react";

export default function EmergencySection() {
  return (
    <section id="emergency" className="section-padding relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 70%)",
            "radial-gradient(ellipse at center, rgba(239,68,68,0.08) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-[#0c0a0a] to-amber-950/20 p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ borderColor: "rgba(239,68,68,0.5)" }}
      >
        <motion.div
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/40"
          >
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </motion.div>

          <div className="flex-1">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-300"
              animate={{ boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.4)", "0 0 0px rgba(239,68,68,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-3 w-3" />
              Urgent Response
            </motion.div>

            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Need Last-Minute Event Staff?
            </h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Replacement crew, coordinators, anchors and production support —
              deployed when your event can&apos;t wait.
            </p>

            <motion.div
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">
                Available within 30 minutes
              </span>
            </motion.div>
          </div>

          <motion.div
            className="shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <Button variant="emergency" size="lg">
              Request Emergency Support
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
