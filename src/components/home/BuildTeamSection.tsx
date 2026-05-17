"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { eventTypes, services, cities } from "@/lib/mock-data";
import { Calendar, IndianRupee, MapPin, Users, Sparkles } from "lucide-react";

const steps = ["Event Details", "Requirements", "Review"];

export default function BuildTeamSection() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    eventType: "",
    budget: "",
    city: "",
    guests: "",
    services: [] as string[],
  });

  const toggleService = (s: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/browse");
  };

  return (
    <section id="build-team" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          label="Core Feature"
          title="Build Your Event Team"
          subtitle="Tell us what you need. We'll match you with verified professionals ready to execute."
        />

        {/* Step indicator */}
        <div className="mb-8 flex justify-center gap-2">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                i <= step
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-white/5 text-zinc-500 border border-white/5"
              }`}
              animate={{ scale: i === step ? 1.05 : 1 }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/30 text-[10px] font-bold">
                {i + 1}
              </span>
              <span className="hidden sm:inline">{s}</span>
            </motion.div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
          <motion.div
            className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-5 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    Event Type
                  </label>
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) =>
                      setForm({ ...form, eventType: e.target.value })
                    }
                    className="input-premium"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                    <IndianRupee className="h-4 w-4 text-amber-400" />
                    Budget
                  </label>
                  <select
                    required
                    value={form.budget}
                    onChange={(e) =>
                      setForm({ ...form, budget: e.target.value })
                    }
                    className="input-premium"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-50k">Under ₹50,000</option>
                    <option value="50k-2l">₹50,000 – ₹2,00,000</option>
                    <option value="2l-10l">₹2,00,000 – ₹10,00,000</option>
                    <option value="10l+">₹10,00,000+</option>
                  </select>
                </div>
                <motion.div
                  className="md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                >
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    City
                  </label>
                  <select
                    required
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                    className="input-premium"
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                    <Users className="h-4 w-4 text-amber-400" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="e.g. 500"
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: e.target.value })
                    }
                    className="input-premium"
                  />
                </div>
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    Required Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        onClick={() => toggleService(s)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                          form.services.includes(s)
                            ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                            : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-2xl p-6 space-y-3"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  Your Event Brief
                </h3>
                {[
                  ["Event", form.eventType],
                  ["Budget", form.budget],
                  ["City", form.city],
                  ["Guests", form.guests],
                  ["Services", form.services.join(", ") || "—"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-white/5 pb-2 text-sm"
                  >
                    <span className="text-zinc-500">{k}</span>
                    <span className="text-white capitalize">{v || "—"}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <motion.div />
            )}
            {step < 2 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                className="sm:ml-auto"
              >
                Continue →
              </Button>
            ) : (
              <Button type="submit" className="sm:ml-auto glow-amber">
                Build My Team
              </Button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
