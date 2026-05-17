"use client";

import { motion } from "framer-motion";
import { Professional } from "@/lib/mock-data";
import { profileImage } from "@/lib/media";
import { Star, MapPin, User } from "lucide-react";
import { scaleIn } from "@/lib/animations";

const availabilityStyles = {
  available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  busy: "bg-red-500/20 text-red-400 border-red-500/30",
  limited: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

interface ProfessionalCardProps {
  professional: Professional;
  index: number;
}

export default function ProfessionalCard({
  professional,
  index,
}: ProfessionalCardProps) {
  const img = professional.image || profileImage;

  return (
    <motion.article
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -6 }}
      className="glass group relative overflow-hidden rounded-2xl p-5 transition-all hover:border-amber-500/20"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />

      <motion.div className="relative flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={professional.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-8 w-8 text-zinc-600" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <motion.div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-white truncate">
                {professional.name}
              </h3>
              <p className="text-sm text-amber-400/80">{professional.role}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${availabilityStyles[professional.availability]}`}
            >
              {professional.availability}
            </span>
          </motion.div>

          <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
            {professional.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {professional.rating} ({professional.reviews})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {professional.city}
            </span>
            <span className="font-semibold text-white">{professional.price}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full rounded-xl border border-amber-500/30 bg-amber-500/10 py-2.5 text-sm font-semibold text-amber-400 transition-colors hover:bg-amber-500/20"
          >
            View Profile
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
}
