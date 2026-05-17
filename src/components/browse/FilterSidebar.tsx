"use client";

import { motion } from "framer-motion";
import { categories, cities } from "@/lib/mock-data";
import { Filter, X } from "lucide-react";

interface FilterSidebarProps {
  city: string;
  setCity: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  budget: string;
  setBudget: (v: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function FilterSidebar({
  city,
  setCity,
  category,
  setCategory,
  budget,
  setBudget,
  mobileOpen,
  setMobileOpen,
}: FilterSidebarProps) {
  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display font-semibold text-white">
          <Filter className="h-4 w-4 text-amber-400" />
          Filters
        </h3>
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-zinc-400"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <motion.div whileHover={{ x: 2 }}>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          City
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input-premium"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div whileHover={{ x: 2 }}>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-premium"
        >
          {categories.map((c) => (
            <option key={c} value={c === "All" ? "" : c}>
              {c}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div whileHover={{ x: 2 }}>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
          Budget
        </label>
        <select
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="input-premium"
        >
          <option value="">Any Budget</option>
          <option value="low">Under ₹5,000/day</option>
          <option value="mid">₹5,000 – ₹15,000/day</option>
          <option value="high">₹15,000+/day</option>
        </select>
      </motion.div>

      <button
        onClick={() => {
          setCity("");
          setCategory("");
          setBudget("");
        }}
        className="w-full text-sm text-zinc-500 hover:text-amber-400 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        className={`glass-strong fixed left-0 top-0 z-50 h-full w-72 p-6 pt-24 md:static md:z-auto md:block md:h-auto md:w-64 md:translate-x-0 md:rounded-2xl md:p-6 md:pt-6 ${
          mobileOpen ? "block" : "hidden md:block"
        }`}
      >
        {content}
      </motion.aside>
    </>
  );
}
