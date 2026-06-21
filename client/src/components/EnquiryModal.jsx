"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  ChevronRight,
  Minus,
  Plus,
  AlertCircle,
} from "lucide-react";

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Social Gathering",
  "Exhibition",
  "Concert",
  "Other",
];

const ADDITIONAL_SAATHIS_CONFIG = [
  {
    id: "guestManagement",
    label: "Guest Management & Hospitality",
    desc: "Welcoming & guiding guests throughout the event",
  },
  {
    id: "porterService",
    label: "Porter Service",
    desc: "Carrying & managing guest luggage at hotel/venue",
  },
  {
    id: "shadowService",
    label: "Shadow Service for Bride/Groom",
    desc: "Dedicated assistant for bride or groom during the event",
  },
  {
    id: "foodBeverages",
    label: "Food & Beverages Management",
    desc: "Supervising food service, buffet & beverage counters",
  },
  {
    id: "vendorManagement",
    label: "Vendor Management",
    desc: "Coordinating with all your vendors on your behalf",
  },
  {
    id: "artistManagement",
    label: "Artist Management",
    desc: "Managing performers, singers, and entertainment artists",
  },
  {
    id: "productionManager",
    label: "Production Manager for Décor",
    desc: "Overseeing décor setup, stage, and mandap installation",
  },
  {
    id: "ritualManagement",
    label: "Ritual Management",
    desc: "Coordinating with pandit and managing all ceremony timings",
  },
  {
    id: "logisticsManagement",
    label: "Logistics Management",
    desc: "Managing guest transport, shuttles & venue movement",
  },
  {
    id: "valetManagement",
    label: "Valet Management",
    desc: "Handling car parking and vehicle movement for guests",
  },
  {
    id: "elderPeople",
    label: "Elder People Management",
    desc: "Dedicated assistance for elderly guests throughout the event",
  },
  {
    id: "nannyKids",
    label: "Nanny for Kids / Play Areas",
    desc: "Supervising and caring for children during the event",
  },
];

const INITIAL_STATE = {
  fullName: "",
  mobileNumber: "",
  emailAddress: "",
  city: "",
  eventType: "",
  customEventType: "", // Custom event name store karne ke liye field
  eventDate: "",
  eventLocation: "",
  guestCount: "",
  estimatedBudget: "",
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
};

export default function EnquiryModal({
  isOpen,
  onClose,
  defaultMode = "booking",
}) {
  const [isTatkalMode, setIsTatkalMode] = useState(defaultMode === "tatkal");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setIsTatkalMode(defaultMode === "tatkal");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      setFormData(INITIAL_STATE);
      setCurrentStep(1);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobileNumber: value }));
    if (errors.mobileNumber)
      setErrors((prev) => ({ ...prev, mobileNumber: "" }));
  };

  const handleStepperChange = (field, currentVal, operationalDelta) => {
    const result = Math.max(0, currentVal + operationalDelta);
    setFormData((prev) => ({
      ...prev,
      saathis: { ...prev.saathis, [field]: result },
    }));
  };

  const validateStep = (step) => {
    const currentErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim())
        currentErrors.fullName = "This field is required";
      if (!formData.mobileNumber.trim()) {
        currentErrors.mobileNumber = "This field is required";
      } else if (formData.mobileNumber.length !== 10) {
        currentErrors.mobileNumber = "Enter a valid 10-digit number";
      }
      if (
        !formData.emailAddress.trim() ||
        !/\S+@\S+\.\S+/.test(formData.emailAddress)
      ) {
        currentErrors.emailAddress = "This field is required";
      }
      if (!formData.city.trim()) currentErrors.city = "This field is required";
    }

    if (step === 2) {
      if (!formData.eventType)
        currentErrors.eventType = "This field is required";

      // Validation for custom event name when "Other" is picked
      if (formData.eventType === "Other" && !formData.customEventType.trim()) {
        currentErrors.customEventType = "Please specify your event name";
      }

      if (!formData.eventDate)
        currentErrors.eventDate = "This field is required";
      if (!formData.eventLocation.trim())
        currentErrors.eventLocation = "This field is required";
      if (!formData.guestCount)
        currentErrors.guestCount = "This field is required";
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log("Submitted Data Payload:", {
        ...formData,
        isEmergencyMode: isTatkalMode,
      });
      onClose();
    }
  };

  const todayDateString = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 select-text">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1C1C1C]/80"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-[#F5F0E8] w-full max-w-3xl h-[85vh] md:h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative border border-[#C9973A]/30 flex flex-col font-['Inter']"
          style={{ willChange: "transform" }}
        >
          {/* Header Layout Block */}
          <div className="bg-[#7B1223] p-4 sm:p-5 flex flex-col gap-3 shrink-0 relative border-b border-[#C9973A]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#C9973A]/20 p-2 rounded-lg border border-[#C9973A]/40">
                  <Sparkles className="h-5 w-5 text-[#C9973A]" />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F5F0E8] tracking-wide">
                    {isTatkalMode ? "Tatkal Support" : "Plan Your Event"}
                  </h2>
                  {isTatkalMode && (
                    <span className="bg-[#D94F3D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse tracking-widest border border-white/20">
                      TATKAL
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[#F5F0E8]/70 hover:text-[#F5F0E8] p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conditionally showing only the notice info bar instead of slider buttons */}
            {isTatkalMode && (
              <div className="pt-1 border-t border-white/10 flex justify-start">
                <span className="text-[11px] font-medium text-white/90 italic tracking-wide animate-fadeIn">
                  * Only for events within 2–3 days
                </span>
              </div>
            )}
          </div>

          {/* Stepper Progress State Bar */}
          <div className="w-full bg-[#8C7B6B]/20 h-1 relative shrink-0">
            <div
              className="h-full bg-[#7B1223] transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>

          <div className="px-5 py-2 grid grid-cols-3 border-b border-[#C9973A]/20 bg-[#FDFAF5] text-center text-[11px] font-bold uppercase tracking-wider shrink-0">
            <span
              className={
                currentStep >= 1
                  ? currentStep === 1
                    ? "text-[#7B1223]"
                    : "text-[#C9973A]"
                  : "text-[#8C7B6B]"
              }
            >
              <span className="sm:inline hidden">Step 1: </span>Personal Details
            </span>
            <span
              className={
                currentStep >= 2
                  ? currentStep === 2
                    ? "text-[#7B1223]"
                    : "text-[#C9973A]"
                  : "text-[#8C7B6B]"
              }
            >
              <span className="sm:inline hidden">Step 2: </span>Event Details
            </span>
            <span
              className={
                currentStep === 3 ? "text-[#7B1223]" : "text-[#8C7B6B]"
              }
            >
              <span className="sm:inline hidden">Step 3: </span>Select Saathis
            </span>
          </div>

          {/* Body Content Form */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#F5F0E8]">
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-serif font-bold text-[#7B1223]">
                  Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.fullName ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.fullName && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleMobileChange}
                      placeholder="e.g. 9876543210"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.mobileNumber ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.mobileNumber && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />{" "}
                        {errors.mobileNumber}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleInputChange}
                      placeholder="name@domain.com"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.emailAddress ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.emailAddress && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />{" "}
                        {errors.emailAddress}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Delhi"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.city ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.city && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" /> {errors.city}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-serif font-bold text-[#7B1223]">
                  Event Details
                </h3>
                <div>
                  <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-2">
                    Event Type *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EVENT_TYPES.map((type) => {
                      const isSelected = formData.eventType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              eventType: type,
                              // Agar "Other" ke alawa kuch select karein toh custom input text clear ho jaye
                              ...(type !== "Other" && { customEventType: "" }),
                            }));

                            setErrors((prev) => ({
                              ...prev,
                              eventType: "",
                              customEventType: "",
                            }));
                          }}
                          className={`px-3 py-2 rounded-full text-xs font-bold border transition-all ${isSelected ? "bg-[#7B1223] text-[#F5F0E8] border-[#7B1223]" : "bg-[#FDFAF5] text-[#7B1223] border-[#C9973A]/30 hover:border-[#7B1223]"}`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  {errors.eventType && (
                    <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1.5">
                      <AlertCircle className="h-3 w-3" /> {errors.eventType}
                    </span>
                  )}
                </div>

                {/* Dynamic input field for Custom Event Name when "Other" is active */}
                {formData.eventType === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-1"
                  >
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Specify Event Name *
                    </label>
                    <input
                      type="text"
                      name="customEventType"
                      value={formData.customEventType}
                      onChange={(e) => {
                        handleInputChange(e);
                        if (errors.customEventType)
                          setErrors((prev) => ({
                            ...prev,
                            customEventType: "",
                          }));
                      }}
                      placeholder="e.g. Baby Shower, Kitty Party, Sangeet Night"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.customEventType ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.customEventType && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />{" "}
                        {errors.customEventType}
                      </span>
                    )}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      min={todayDateString}
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.eventDate ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.eventDate && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" /> {errors.eventDate}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                      Event Location / Venue *
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleInputChange}
                      placeholder="e.g. Raj Mahal Banquet, Jaipur"
                      className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.eventLocation ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                    />
                    {errors.eventLocation && (
                      <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />{" "}
                        {errors.eventLocation}
                      </span>
                    )}
                  </div>

                  <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                        Expected Guest Count *
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        placeholder="e.g. 350"
                        min="1"
                        className={`w-full bg-[#FDFAF5] border rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors ${errors.guestCount ? "border-[#D94F3D]" : "border-[#C9973A]/30"}`}
                      />
                      {errors.guestCount && (
                        <span className="text-[#D94F3D] text-xs font-semibold flex items-center gap-1 mt-1">
                          <AlertCircle className="h-3 w-3" />{" "}
                          {errors.guestCount}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-1">
                        Estimated Budget
                      </label>
                      <input
                        type="text"
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleInputChange}
                        placeholder="Optional — e.g. ₹2,00,000"
                        className="w-full bg-[#FDFAF5] border border-[#C9973A]/30 rounded-lg p-2.5 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#7B1223] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-serif font-bold text-[#7B1223]">
                  Select Your Saathis
                </h3>
                <div className="bg-[#7B1223] border border-[#C9973A]/40 rounded-xl p-4 flex items-center justify-between shadow-md">
                  <div className="pr-4">
                    <span className="bg-[#C9973A] text-[#1C1C1C] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      Always Included
                    </span>
                    <h4 className="text-sm font-bold text-[#F5F0E8] mt-1.5">
                      Event Captain — 1
                    </h4>
                    <p className="text-xs text-[#F5F0E8]/80 mt-1 leading-relaxed">
                      Your Event Captain manages everything on ground —
                      coordinates vendors, guests, and team throughout the
                      event.
                    </p>
                  </div>
                  <div className="text-center font-bold text-base text-[#7B1223] bg-[#FDFAF5] border-2 border-[#C9973A] w-12 h-10 flex items-center justify-center rounded-lg shrink-0 shadow-inner">
                    1
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-[#8C7B6B] uppercase tracking-wider mb-3">
                    Add more Saathis as per your need
                  </p>
                  <div className="space-y-3">
                    {ADDITIONAL_SAATHIS_CONFIG.map((item) => {
                      const currentValue = formData.saathis[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="bg-[#FDFAF5] border border-[#C9973A]/20 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-[#C9973A]/40 transition-all"
                        >
                          <div className="space-y-0.5">
                            <h5 className="text-sm font-bold text-[#1C1C1C] leading-tight">
                              {item.label}
                            </h5>
                            <p className="text-xs text-[#8C7B6B] leading-normal">
                              {item.desc}
                            </p>
                          </div>
                          <div className="flex items-center justify-end shrink-0 self-end sm:self-center bg-white border border-[#C9973A]/30 rounded-lg p-1 overflow-hidden shadow-sm">
                            <button
                              type="button"
                              disabled={currentValue === 0}
                              onClick={() =>
                                handleStepperChange(item.id, currentValue, -1)
                              }
                              className={`p-1.5 rounded transition-colors ${currentValue === 0 ? "text-gray-300 cursor-not-allowed" : "text-[#7B1223] hover:bg-[#7B1223]/5"}`}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-[#7B1223]">
                              {currentValue}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleStepperChange(item.id, currentValue, 1)
                              }
                              className="p-1.5 text-[#7B1223] hover:bg-[#7B1223]/5 rounded transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-5 py-4 bg-[#F5F0E8] border-t border-[#C9973A]/20 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="text-sm font-bold text-[#7B1223] hover:text-[#C9973A] transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1 bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#C9973A] hover:text-[#7B1223] transition-all duration-300"
              >
                Next Step <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleFormSubmission}
                className={`w-full sm:w-auto text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full shadow-lg transition-all duration-300 ${isTatkalMode ? "bg-[#D94F3D] text-white hover:bg-[#7B1223]" : "bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] hover:bg-[#C9973A] hover:text-[#7B1223]"}`}
              >
                {isTatkalMode
                  ? "Request Emergency Help →"
                  : "Submit Your Requirement →"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
