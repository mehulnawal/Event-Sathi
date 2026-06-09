"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Clock, PhoneCall, AlertTriangle } from "lucide-react";

export default function EmergencyModal({ isOpen, onClose }) {
  // 1. Lock Viewport Body Scroll when modal is mounted over page
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // 2. Emergency Form State Setup
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    city: "",
    crisisCategory: "", // What went wrong
    hoursRemaining: "", // Time left until event starts
    crisisDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCrisisCategory = (cat) => {
    setFormData((prev) => ({ ...prev, crisisCategory: cat }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate high priority dispatch tracking telemetry
    console.log("🚨 EMERGENCY DISPATCH DISPATCHED:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "🚨 CRITICAL DISPATCH LIVE: Our regional emergency sathi has been pinged. Keep your phone line free; we are calling you back within 30 minutes!",
      );
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-text">
        {/* Dark High-contrast Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1C1C1C]/85 backdrop-blur-md"
        />

        {/* Modal Window Container Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 40 }}
          transition={{ type: "spring", duration: 0.45 }}
          className="bg-[#FDFAF5] w-full max-w-xl max-h-[90vh] md:max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative border-2 border-[#D94F3D] flex flex-col font-['Inter']"
        >
          {/* Header Layout Banner Container */}
          <div className="bg-[#7B1223] p-5 border-b border-[#D94F3D]/30 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#D94F3D]/20 p-2 rounded-lg border border-[#D94F3D]/50 animate-pulse">
                <ShieldAlert className="h-6 w-6 text-[#D94F3D]" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#F5F0E8] tracking-wide flex items-center gap-2">
                  Tatkal Emergency Support
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#C9973A] font-bold uppercase tracking-wider mt-0.5">
                  <Clock className="h-3 w-3 text-[#D94F3D]" /> 30-Minute
                  Priority Response Channel
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#F5F0E8]/70 hover:text-[#F5F0E8] p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Scrollable Content Block */}
          <form
            onSubmit={handleSubmit}
            className="p-5 md:p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin"
          >
            {/* Live Warning Notice Box */}
            <div className="bg-[#D94F3D]/10 border border-[#D94F3D]/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-[#D94F3D] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#7B1223]">
                  Vendor Dropout / Backup Request
                </h4>
                <p className="text-xs text-[#8C7B6B] mt-0.5 leading-relaxed">
                  Did a vendor ghost you or back out at the last second? Fill
                  this out to immediately deploy backup operators from our
                  verified local partner network.
                </p>
              </div>
            </div>

            {/* QUICK SELECTION: WHO CRASHED/DROPPED OUT */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider">
                Which Service Backed Out / Failed? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "Decor & Themes",
                  "Catering Service",
                  "Sound & Light",
                  "Photography",
                  "Venue / Banquet",
                  "Other / General",
                ].map((cat) => {
                  const isSelected = formData.crisisCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => selectCrisisCategory(cat)}
                      className={`p-2.5 text-xs font-bold rounded-lg border transition-all text-center cursor-pointer ${
                        isSelected
                          ? "bg-[#D94F3D] border-[#D94F3D] text-white shadow-md scale-[1.02]"
                          : "bg-white border-[#C9973A]/30 text-[#1C1C1C] hover:border-[#D94F3D]/50"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              {/* Hidden required field tracking validation rule anchor */}
              <input
                type="hidden"
                required
                name="crisisCategory"
                value={formData.crisisCategory}
              />
            </div>

            {/* TIME SENSITIVITY FIELDS PANEL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                  How many hours until the event starts? *
                </label>
                <select
                  required
                  name="hoursRemaining"
                  value={formData.hoursRemaining}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D94F3D] transition-colors"
                >
                  <option value="">Select Time Window</option>
                  <option value="Under 6 Hours">
                    Less than 6 Hours (Critical)
                  </option>
                  <option value="6 to 12 Hours">6 to 12 Hours</option>
                  <option value="12 to 24 Hours">12 to 24 Hours</option>
                  <option value="Next 2-3 Days">Next 2 to 3 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                  Current Target City *
                </label>
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D94F3D] transition-colors"
                  placeholder="e.g., Jaipur, South Delhi"
                />
              </div>
            </div>

            {/* CONTACT TELEMETRY DETAILS BLOCK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D94F3D] transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                  Active Mobile Number (For Call Back) *
                </label>
                <input
                  required
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D94F3D] transition-colors font-mono"
                  placeholder="Enter 10-digit number"
                />
              </div>
            </div>

            {/* CRISIS DESCRIPTION TEXTAREA */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider">
                Describe your exact situation / requirements *
              </label>
              <textarea
                required
                name="crisisDetails"
                value={formData.crisisDetails}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-white border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#D94F3D] transition-colors placeholder:text-gray-400"
                placeholder="Example: Decorator did not arrive for mehendi setup, need full stage setup and seating for 150 guests by tonight 7 PM..."
              />
            </div>

            {/* STICKY BOTTOM CONFIRMATION TRIGGER CALL TO ACTION */}
            <div className="pt-3 border-t border-[#C9973A]/10 flex items-center justify-end sticky bottom-0 bg-[#FDFAF5] pb-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D94F3D] hover:bg-[#7B1223] text-white font-bold py-3.5 px-6 rounded-full shadow-xl hover:shadow-[#D94F3D]/20 transform hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="h-4 w-4" />
                {isSubmitting
                  ? "Dispatching Alarm Ticket..."
                  : "Deploy Emergency Hotline Matcher →"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
