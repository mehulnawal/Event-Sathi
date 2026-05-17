"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/browse/FilterSidebar";
import ProfessionalCard from "@/components/browse/ProfessionalCard";
import { professionals } from "@/lib/mock-data";
import { staggerContainer } from "@/lib/animations";
import { SlidersHorizontal, Search } from "lucide-react";

export default function BrowsePage() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [search, setSearch] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    return professionals.filter((p) => {
      if (city && p.city !== city) return false;
      if (category && p.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.role.toLowerCase().includes(q)
        )
          return false;
      }
      if (budget === "low" && parseInt(p.price.replace(/\D/g, "")) > 5000)
        return false;
      if (budget === "mid") {
        const n = parseInt(p.price.replace(/\D/g, ""));
        if (n < 5000 || n > 15000) return false;
      }
      if (budget === "high" && parseInt(p.price.replace(/\D/g, "")) < 15000)
        return false;
      return true;
    });
  }, [city, category, budget, search]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pt-28 pb-20 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Marketplace
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-5xl">
            Browse <span className="gradient-text">Professionals</span>
          </h1>
          <p className="mt-3 max-w-xl text-zinc-400">
            Verified event professionals ready to join your crew. Filter by city,
            category and budget.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-premium pl-11"
            />
          </div>
          <button
            onClick={() => setMobileFilters(true)}
            className="btn-secondary flex items-center justify-center gap-2 md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            city={city}
            setCity={setCity}
            category={category}
            setCategory={setCategory}
            budget={budget}
            setBudget={setBudget}
            mobileOpen={mobileFilters}
            setMobileOpen={setMobileFilters}
          />

          <div className="flex-1 min-w-0">
            <p className="mb-4 text-sm text-zinc-500">
              {filtered.length} professional{filtered.length !== 1 ? "s" : ""}{" "}
              found
            </p>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {filtered.map((p, i) => (
                <ProfessionalCard key={p.id} professional={p} index={i} />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-12 text-center"
              >
                <p className="text-zinc-400">No professionals match your filters.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
