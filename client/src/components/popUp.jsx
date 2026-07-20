"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SHOW_POPUP = true;
const POPUP_DELAY = 4000;

export default function PromoPopup({ onEnquire }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!SHOW_POPUP) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,.65)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-[#FDF8F3] p-8 shadow-2xl text-center border border-[#C9973A]/30"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-[#7B1223]/60 hover:text-[#7B1223] transition cursor-pointer"
            >
              <X size={24} />
            </button>

            <span className="uppercase tracking-[3px] text-xs text-[#C9973A] font-semibold">
              LIMITED TIME OFFER
            </span>

            <h2 className="mt-3 font-['Playfair_Display'] text-4xl font-bold text-[#7B1223] leading-tight">
              Save Up To
              <br />
              30% OFF
            </h2>

            <p className="mt-5 text-[#5E5E5E] leading-7">
              Book your event with <strong>Event Saathi</strong> and enjoy
              <strong> up to 30% OFF </strong>
              on the
              <strong> first 10 confirmed bookings.</strong>
            </p>

            <p className="mt-3 text-xs text-[#8A8A8A]">
              *Offer valid only for the first 10 confirmed bookings.
              <br />
              Subject to Terms & Conditions.
            </p>

            <button
              onClick={() => {
                setIsOpen(false);

                if (onEnquire) {
                  onEnquire();
                }
              }}
              className="mt-8 bg-[#7B1223] hover:bg-[#96152D] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer"
            >
              Enquire Now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
