"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function FloatingVendorButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed right-4 bottom-24 z-40 md:right-6 md:bottom-8"
    >
      <Link href="/vendor">
        <motion.div
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 backdrop-blur-sm md:px-5"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Become a Vendor</span>
          <span className="sm:hidden">Vendor</span>
          <motion.span
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
