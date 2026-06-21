import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  X,
  Upload,
  ChevronRight,
  FileText,
  CheckCircle2,
} from "lucide-react";

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

const INITIAL_STATE = {
  // Step 1
  fullName: "",
  mobile: "",
  email: "",
  city: "",
  state: "",
  // Step 2
  currentOccupation: "",
  organizationName: "",
  experienceYears: "",
  linkedinProfile: "",
  // Step 3
  targetCity: "",
  hasVendorNetwork: "No",
  vendorConnectionsCount: "",
  hasEventExperience: "No",
  // Step 4
  whyJoin: "",
  howContribute: "",
  resumeFile: null,
  socialMediaLinks: "",
  agreedDeclaration: false,
};

export default function CityPartnerModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  // Scroll lock on body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form components when modal closes
      setFormData(INITIAL_STATE);
      setCurrentStep(1);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: value }));
    if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          resumeFile: "Only PDF files are accepted.",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          resumeFile: "File size must be under 5MB.",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFile: file }));
      setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (formData.mobile.length !== 10)
        newErrors.mobile = "Enter a valid 10-digit mobile number";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email address";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
    } else if (step === 2) {
      if (!formData.currentOccupation.trim())
        newErrors.currentOccupation = "Current occupation is required";
      if (!formData.experienceYears)
        newErrors.experienceYears = "Please select your years of experience";
    } else if (step === 3) {
      if (!formData.targetCity.trim())
        newErrors.targetCity = "Target representation city is required";
    } else if (step === 4) {
      if (!formData.whyJoin.trim())
        newErrors.whyJoin = "This field is required";
      if (!formData.howContribute.trim())
        newErrors.howContribute = "This field is required";
      if (!formData.agreedDeclaration)
        newErrors.agreedDeclaration =
          "Please accept the declaration to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      console.log("City Partner Application Submitted Data:", formData);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FDFAF5] rounded-xl shadow-2xl overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Header Banner */}
          <div className="bg-[#7B1223] px-6 py-5 flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <div className="bg-[#C9973A]/10 p-2 rounded-lg border border-[#C9973A]/30">
                <MapPin className="h-6 w-6 text-[#C9973A]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F5F0E8] tracking-wide">
                  Become a City Saathi
                </h2>
                <p className="text-xs text-[#8C7B6B]">
                  Represent EventSathi in your city
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#8C7B6B] hover:text-[#F5F0E8] p-1 rounded-full hover:bg-black/10 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Dynamic Progress Indicator Bar */}
          <div className="w-full flex h-1.5 bg-[#8C7B6B]/20">
            <div
              className="h-full bg-[#7B1223] transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="px-4 pt-3 pb-2 grid grid-cols-4 border-b border-[#8C7B6B]/10 bg-[#F5F0E8]/50 text-center text-[10px] sm:text-xs font-semibold">
            <span
              className={
                currentStep >= 1
                  ? currentStep === 1
                    ? "text-[#7B1223]"
                    : "text-[#C9973A]"
                  : "text-[#8C7B6B]"
              }
            >
              1. Personal Info
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
              2. Background
            </span>
            <span
              className={
                currentStep >= 3
                  ? currentStep === 3
                    ? "text-[#7B1223]"
                    : "text-[#C9973A]"
                  : "text-[#8C7B6B]"
              }
            >
              3. Representation
            </span>
            <span
              className={
                currentStep === 4 ? "text-[#7B1223]" : "text-[#8C7B6B]"
              }
            >
              4. Declaration
            </span>
          </div>

          {/* Form Content Body */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {/* STEP 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.fullName ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.fullName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      placeholder="Enter 10-digit mobile number"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.mobile ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.mobile && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@domain.com"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.email ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.email && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Pune"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.city ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.city && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.city}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Maharashtra"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.state ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.state && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.state}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Professional Background */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Professional Background
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Current Occupation *
                    </label>
                    <input
                      type="text"
                      name="currentOccupation"
                      value={formData.currentOccupation}
                      onChange={handleInputChange}
                      placeholder="e.g. Business Consultant"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.currentOccupation ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.currentOccupation && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.currentOccupation}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Organization / Company Name{" "}
                      <span className="text-[#8C7B6B] font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Enterprises"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Years of Experience in Events / Networking / Business
                      Development *
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.experienceYears ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    >
                      <option value="">Select experience level</option>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.experienceYears && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.experienceYears}
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      LinkedIn Profile{" "}
                      <span className="text-[#8C7B6B] font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      placeholder="e.g. linkedin.com/in/yourname"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: City Representation */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  City Representation
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Which city would you like to represent? *
                  </label>
                  <input
                    type="text"
                    name="targetCity"
                    value={formData.targetCity}
                    onChange={handleInputChange}
                    placeholder="e.g. Nagpur"
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.targetCity ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.targetCity && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.targetCity}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Do you have a local vendor network? *
                  </label>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            hasVendorNetwork: option,
                          }))
                        }
                        className={`w-24 py-2 text-sm font-bold rounded-lg border transition-all ${
                          formData.hasVendorNetwork === option
                            ? "bg-[#7B1223] text-[#F5F0E8] border-[#7B1223]"
                            : "bg-transparent text-[#1C1C1C] border-[#8C7B6B]/40 hover:border-[#8C7B6B]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional Field: Only shown when local vendor network is Yes */}
                <AnimatePresence initial={false}>
                  {formData.hasVendorNetwork === "Yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                        Approximate Number of Vendor Connections{" "}
                        <span className="text-[#8C7B6B] font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="number"
                        name="vendorConnectionsCount"
                        value={formData.vendorConnectionsCount}
                        onChange={handleInputChange}
                        min="0"
                        placeholder="e.g. 25"
                        className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Experience in Event Management *
                  </label>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            hasEventExperience: option,
                          }))
                        }
                        className={`w-24 py-2 text-sm font-bold rounded-lg border transition-all ${
                          formData.hasEventExperience === option
                            ? "bg-[#7B1223] text-[#F5F0E8] border-[#7B1223]"
                            : "bg-transparent text-[#1C1C1C] border-[#8C7B6B]/40 hover:border-[#8C7B6B]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Why Join & Declaration */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Why Join EventSathi?
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Why do you want to become a City Saathi? *
                  </label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your motivation..."
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.whyJoin ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.whyJoin && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.whyJoin}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    How can you contribute to growing EventSathi in your city? *
                  </label>
                  <textarea
                    name="howContribute"
                    value={formData.howContribute}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe your strategy or connections..."
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.howContribute ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.howContribute && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.howContribute}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Upload Resume / Profile{" "}
                    <span className="text-[#8C7B6B] font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-[#C9973A] text-[#C9973A] rounded-lg text-xs font-bold cursor-pointer hover:bg-[#C9973A]/5 transition-colors">
                      <Upload className="h-4 w-4" />
                      Choose PDF
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {formData.resumeFile ? (
                      <div className="flex items-center gap-1.5 text-xs text-[#7B1223] font-medium bg-[#7B1223]/5 px-2.5 py-1 rounded border border-[#7B1223]/20 max-w-xs truncate">
                        <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {formData.resumeFile.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8C7B6B]">
                        Accepts PDF only (Max 5MB)
                      </span>
                    )}
                  </div>
                  {errors.resumeFile && (
                    <span className="text-xs text-[#D94F3D] mt-1 block">
                      {errors.resumeFile}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Social Media Links{" "}
                    <span className="text-[#8C7B6B] font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="socialMediaLinks"
                    value={formData.socialMediaLinks}
                    onChange={handleInputChange}
                    placeholder="Instagram, Twitter or any other link"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                  />
                </div>

                <div className="pt-2 border-t border-[#8C7B6B]/10">
                  <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      name="agreedDeclaration"
                      checked={formData.agreedDeclaration}
                      onChange={handleInputChange}
                      className="mt-1 accent-[#7B1223] h-4 w-4 rounded"
                    />
                    <span className="text-xs font-medium text-[#1C1C1C] group-hover:text-black transition-colors">
                      I agree to represent EventSathi professionally and uphold
                      brand values. *
                    </span>
                  </label>
                  {errors.agreedDeclaration && (
                    <span className="text-xs text-[#D94F3D] mt-1.5 font-semibold block">
                      Please accept the declaration to proceed
                    </span>
                  )}
                </div>
              </div>
            )}
          </form>

          {/* Action Footer Navigation Buttons */}
          <div className="px-6 py-4 bg-[#F5F0E8] border-t border-[#8C7B6B]/20 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2 text-sm font-semibold text-[#7B1223] hover:text-[#C9973A] transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] rounded-full px-6 py-2 text-sm font-bold shadow-md hover:bg-[#C9973A] hover:text-[#7B1223] transition-all duration-300"
              >
                Next Step <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!formData.agreedDeclaration}
                className={`flex items-center gap-1.5 bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] rounded-full px-7 py-2.5 text-sm font-bold shadow-md transition-all duration-300 ${
                  formData.agreedDeclaration
                    ? "hover:bg-[#C9973A] hover:text-[#7B1223] cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Apply as City Saathi →
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
