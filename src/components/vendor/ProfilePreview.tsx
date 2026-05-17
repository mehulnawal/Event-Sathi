"use client";

import { motion } from "framer-motion";
import { vendorImage } from "@/lib/media";
import { User, Star, MapPin, IndianRupee } from "lucide-react";

interface ProfilePreviewProps {
  name: string;
  serviceType: string;
  city: string;
  pricing: string;
  availability: string;
  teamType: string;
  experience: string;
}

export default function ProfilePreview({
  name,
  serviceType,
  city,
  pricing,
  availability,
  teamType,
  experience,
}: ProfilePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-strong sticky top-28 rounded-3xl p-6"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-violet-400">
        Live Preview
      </p>

      <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
        {vendorImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={vendorImage} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-12 w-12 text-zinc-600" />
          </div>
        )}
      </div>

      <h3 className="text-center font-display text-xl font-bold text-white">
        {name || "Your Name"}
      </h3>
      <p className="text-center text-sm text-amber-400">
        {serviceType || "Service Type"}
      </p>

      <motion.div
        className="mt-4 space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {[
          { icon: MapPin, label: city || "City" },
          { icon: IndianRupee, label: pricing || "Pricing" },
          { icon: Star, label: experience ? `${experience} yrs exp` : "Experience" },
        ].map(({ icon: Icon, label }) => (
          <motion.div
            key={label}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="flex items-center gap-2 text-sm text-zinc-400"
          >
            <Icon className="h-4 w-4 text-zinc-500" />
            {label}
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-4 flex flex-wrap justify-center gap-2">
        {availability && (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {availability}
          </span>
        )}
        {teamType && (
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-400">
            {teamType}
          </span>
        )}
      </motion.div>

      <motion.div
        className="mt-6 rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-zinc-600"
        animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(139,92,246,0.3)", "rgba(255,255,255,0.1)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Profile goes live after review
      </motion.div>
    </motion.div>
  );
}
