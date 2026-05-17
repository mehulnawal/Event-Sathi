"use client";

import { motion } from "framer-motion";
import { categoryBreakdown } from "@/lib/mock-data";

export default function CategoryChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="font-display text-lg font-semibold text-white">
        Category Breakdown
      </h3>
      <p className="text-xs text-zinc-500">Vendor distribution by category</p>

      <motion.div className="mt-6 space-y-4">
        {categoryBreakdown.map((cat, i) => (
          <div key={cat.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-zinc-400">{cat.name}</span>
              <span className="font-medium text-white">{cat.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: cat.color }}
                initial={{ width: 0 }}
                animate={{ width: `${cat.value}%` }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
