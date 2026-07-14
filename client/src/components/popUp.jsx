"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// ---- CONTROL FLAG ----
// true = popup enabled (har page load/refresh pe aayega)
// false = disabled
const SHOW_POPUP = true;

// Delay before popup appears (ms)
const POPUP_DELAY = 4000;

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!SHOW_POPUP) return;
    const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!SHOW_POPUP) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
          style={{ background: "rgba(28,28,28,0.6)" }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl p-8 text-center bg-[var(--color-bg)] border border-[var(--color-accent)]/25 shadow-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close popup"
              className="absolute top-4 right-4 text-[var(--color-primary)]/60 hover:text-[var(--color-primary)] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* PLACEHOLDER CONTENT — client ka final content aane ke baad yaha replace karna */}
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-primary)] mb-2">
              Popup Title Here
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Placeholder description text — content pending.
            </p>
            <button
              className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[#9B1535] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Placeholder CTA
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
