"use client";

import { motion } from "framer-motion";
import { bookingAnalytics } from "@/lib/mock-data";

export default function BookingChart() {
  const max = Math.max(...bookingAnalytics.map((d) => d.bookings));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="font-display text-lg font-semibold text-white">
        Booking Analytics
      </h3>
      <p className="text-xs text-zinc-500">Monthly bookings (demo data)</p>

      <div className="mt-8 flex items-end justify-between gap-2 h-48">
        {bookingAnalytics.map((d, i) => (
          <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              className="w-full rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-400"
              initial={{ height: 0 }}
              animate={{ height: `${(d.bookings / max) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ minHeight: 4 }}
            />
            <span className="text-xs text-zinc-500">{d.month}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
