"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Share2, Globe, Mail, MessageCircle } from "lucide-react";
import { cities, services } from "@/lib/mock-data";

const quickLinks = [
  { label: "Build Your Team", href: "/#build-team" },
  { label: "Browse Professionals", href: "/browse" },
  { label: "Emergency Support", href: "/#emergency" },
  { label: "Join as Vendor", href: "/vendor" },
  { label: "Admin Dashboard", href: "/admin" },
];

const seoCategories = [
  "Wedding Event Staff Mumbai",
  "Corporate Event Managers Delhi",
  "Concert Production Crew Bangalore",
  "Last Minute Event Staff Hyderabad",
  "Anchor for Events Chennai",
  "Wedding Decorators Pune",
  "Sound Engineers for Events",
  "Event Lighting Designers India",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020204]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-padding mx-auto max-w-7xl"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 h-px w-full origin-left bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
        />

        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600"
              >
                <Zap className="h-5 w-5 text-black" fill="black" />
              </motion.div>
              <span className="font-display text-xl font-bold text-white">
                Event<span className="text-amber-400">Sathi</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              India&apos;s premium event staffing marketplace. Build teams.
              Execute flawlessly.
            </p>
            <div className="mt-6 flex gap-3">
              {[Share2, Globe, Mail, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.slice(0, 8).map((s) => (
                <li key={s}>
                  <span className="text-sm text-zinc-500">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Cities
            </h4>
            <ul className="space-y-2.5">
              {cities.map((city) => (
                <li key={city}>
                  <span className="text-sm text-zinc-500">{city}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold text-white">Contact</h4>
              <p className="text-sm text-zinc-500">hello@eventsathi.com</p>
              <p className="text-sm text-zinc-500">+91 98765 43210</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {seoCategories.map((cat) => (
              <span
                key={cat}
                className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Event Sathi. Frontend demo prototype.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
