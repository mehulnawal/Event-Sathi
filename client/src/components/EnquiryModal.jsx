"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, Sparkles, User, Users, Info } from "lucide-react";

export default function EnquiryModal({
  isOpen,
  onClose,
  isEmergencyMode = false,
}) {
  // 1. Viewport Body Scroll-Lock Logic
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

  // 2. Form Initial State
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    city: "",
    eventType: "",
    eventDate: "",
    eventLocation: "",
    guestCount: "",
    estimatedBudget: "",
    emergencyDescription: "",
    // Quantities for additional saathis
    saathis: {
      guestManagement: 0,
      porterService: 0,
      shadowService: 0,
      foodBeverages: 0,
      vendorManagement: 0,
      artistManagement: 0,
      productionManager: 0,
      ritualManagement: 0,
      logisticsManagement: 0,
      valetManagement: 0,
      elderPeople: 0,
      nannyKids: 0,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (service, value) => {
    const qty = Math.max(0, parseInt(value, 10) || 0);
    setFormData((prev) => ({
      ...prev,
      saathis: { ...prev.saathis, [service]: qty },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data Payload:", {
      ...formData,
      isEmergency: isEmergencyMode,
    });
    alert(
      isEmergencyMode
        ? "Emergency Request Broadcasted! Our team will call you within 30 minutes."
        : "Requirement Submitted Successfully!",
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center py-4 sm:py-6 md:py-10 px-4 select-text">
        {/* Backdrop overlay blur blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1C1C1C]/70 backdrop-blur-md"
        />

        {/* Modal Sheet Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-[#F5F0E8] w-full max-w-3xl h-[85vh] md:h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative border border-[#C9973A]/30 flex flex-col font-['Inter']"
        >
          {/* Header Layout Banner Container */}
          <div
            className={`${isEmergencyMode ? "bg-[#7B1223]" : "bg-[#7B1223]"} p-6 border-b border-[#C9973A]/30 flex items-center justify-between sticky top-0 z-10`}
          >
            <div className="flex items-center gap-3">
              {isEmergencyMode ? (
                <div className="bg-[#D94F3D]/20 p-2 rounded-lg border border-[#D94F3D]/40">
                  <ShieldAlert className="h-6 w-6 text-[#D94F3D] animate-pulse" />
                </div>
              ) : (
                <div className="bg-[#C9973A]/20 p-2 rounded-lg border border-[#C9973A]/40">
                  <Sparkles className="h-6 w-6 text-[#C9973A]" />
                </div>
              )}
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F0E8] tracking-wide">
                  {isEmergencyMode
                    ? "Tatkal Support Deployment"
                    : "Plan Your Event"}
                </h2>
                {/* <p className="text-xs text-[#C9973A] font-semibold uppercase tracking-widest mt-0.5">
                  {isEmergencyMode
                    ? "🚨 Priority Emergency Response Enabled"
                    : "Aapka Event, Aapki Khushi"}
                </p> */}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#F5F0E8]/70 hover:text-[#F5F0E8] p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8 scrollbar-thin"
          >
            {/* Condition Warning Header Box if clicked from Emergency system buttons */}
            {isEmergencyMode && (
              <div className="bg-[#D94F3D]/10 border border-[#D94F3D]/30 rounded-xl p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-[#D94F3D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#7B1223]">
                    Emergency Routing Active
                  </h4>
                  <p className="text-xs text-[#8C7B6B] mt-1 leading-relaxed">
                    This ticket will skip our layout queues and ping our
                    regional operators directly. Please provide operational data
                    immediately.
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 1: PERSONAL DETAILS */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#7B1223] border-b border-[#C9973A]/20 pb-1.5 flex items-center gap-2">
                <User className="h-4 w-4 text-[#C9973A]" /> Personal Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                    placeholder="e.g. New Delhi"
                  />
                </div>
              </div>
            </div>

            {/* EMERGENCY SPECIFIC INPUT BOX PANEL */}
            {isEmergencyMode && (
              <div className="space-y-2 animate-fadeIn">
                <label className="block text-xs font-bold text-[#D94F3D] uppercase tracking-wider mb-1">
                  Describe Vendor Dropout / Emergency Need *
                </label>
                <textarea
                  required
                  name="emergencyDescription"
                  value={formData.emergencyDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full bg-[#FDFAF5] border border-[#D94F3D]/40 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                  placeholder="Provide details about which supplier backed out or what operational crisis needs support lines immediately..."
                />
              </div>
            )}

            {/* SECTION 2: EVENT DETAILS */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#7B1223] border-b border-[#C9973A]/20 pb-1.5 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C9973A]" /> Event Real
                Estate Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Event Type *
                  </label>
                  <select
                    required
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                  >
                    <option value="">Choose Category Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Social Gathering">Social Gathering</option>
                    <option value="Exhibition">Exhibition</option>
                    <option value="Concert">Concert</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Event Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                    Event Location / Venue Address *
                  </label>
                  <input
                    required
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                    placeholder="Hotel name, banquet, lawn or area coordinates"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                        Guest Count *
                      </label>
                      <input
                        required
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                        placeholder="e.g. 350"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                        Est. Budget (INR)
                      </label>
                      <input
                        type="text"
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleInputChange}
                        className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: STAFF QUANTITY MATRIX CONFIGURATION PANEL */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#7B1223] border-b border-[#C9973A]/20 pb-1.5 flex items-center gap-2">
                <Users className="h-4 w-4 text-[#C9973A]" /> Configure Saathi
                Allocation Requirements
              </h3>

              {/* Compulsory Captain Row Box Card */}
              <div className="bg-[#7B1223]/5 border border-[#7B1223]/30 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="bg-[#7B1223] text-[#F5F0E8] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    Mandatory Core Officer
                  </span>
                  <h4 className="text-sm font-bold text-[#1C1C1C] mt-1">
                    Event Captain
                  </h4>
                  <p className="text-xs text-[#8C7B6B]">
                    Pre-selected base manager responsible for coordinating your
                    overall event blueprint layout mapping.
                  </p>
                </div>
                <div className="text-center font-bold text-lg text-[#7B1223] bg-[#FDFAF5] border border-[#C9973A]/30 w-12 h-10 flex items-center justify-center rounded-lg shadow-sm">
                  1
                </div>
              </div>

              {/* Sublabel Matrix Helper Info */}
              <p className="text-xs font-semibold text-[#8C7B6B] uppercase tracking-wider pt-2">
                Additional Saathis Request Matrix:
              </p>

              {/* Grid System for Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "guestManagement",
                    label: "Guest Management & Hospitality",
                  },
                  { id: "porterService", label: "Porter Service" },
                  {
                    id: "shadowService",
                    label: "Shadow Service for Bride/Groom",
                  },
                  { id: "foodBeverages", label: "Food & Beverages Management" },
                  { id: "vendorManagement", label: "Vendor Management" },
                  { id: "artistManagement", label: "Artist Management" },
                  {
                    id: "productionManager",
                    label: "Production Manager for Décor",
                  },
                  { id: "ritualManagement", label: "Ritual Management" },
                  { id: "logisticsManagement", label: "Logistics Management" },
                  { id: "valetManagement", label: "Valet Management" },
                  { id: "elderPeople", label: "Elder People Management" },
                  { id: "nannyKids", label: "Nanny for Kids / Play Areas" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FDFAF5] border border-[#C9973A]/20 rounded-xl p-3.5 flex items-center justify-between hover:border-[#C9973A]/50 transition-all shadow-sm"
                  >
                    <span className="text-xs font-medium text-[#1C1C1C] pr-2 leading-tight">
                      {item.label}
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={formData.saathis[item.id]}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="w-16 bg-white border border-[#C9973A]/30 rounded-lg p-1.5 text-center text-sm font-bold text-[#7B1223] focus:outline-none focus:border-[#7B1223]"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="pt-4 border-t border-[#C9973A]/20 flex items-center justify-end sticky bottom-0 bg-[#F5F0E8] pb-1">
              <button
                type="submit"
                className={`w-full sm:w-auto text-base font-bold px-10 py-3.5 rounded-full shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer ${
                  isEmergencyMode
                    ? "bg-[#D94F3D] text-white hover:bg-[#7B1223]"
                    : "bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] hover:bg-[#C9973A] hover:text-[#7B1223]"
                }`}
              >
                {isEmergencyMode
                  ? "Deploy Emergency Sathi Now →"
                  : "Submit Your Requirement Portfolio →"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
