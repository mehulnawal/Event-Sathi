"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  X,
  Upload,
  CheckCircle2,
  ChevronRight,
  FileText,
} from "lucide-react";

const CATEGORIES = [
  "Decor",
  "Catering",
  "Photography",
  "Videography",
  "Sound & Light",
  "Artist Management",
  "Venue",
  "Hospitality",
  "Transport",
  "Production",
  "Gifts & Merchandise",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

const INITIAL_STATE = {
  businessName: "",
  contactName: "",
  mobile: "",
  email: "",
  city: "",
  state: "",
  category: [],
  otherCategoryText: "",
  experience: "",
  areasServed: "",
  teamSize: "",
  socialLink: "",
  portfolioLink: "",
  companyProfile: null,
  gstNumber: "",
  address: "",
  emergencyAvailability: "No",
  aboutServices: "",
};

// URL validation helper pattern
const URL_REGEX =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;

// Official 15-character Indian GSTIN Validation Pattern
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

export default function VendorModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setFormData(INITIAL_STATE);
      setCurrentStep(1);
      setErrors({});
      setIsSubmitting(false);
      setSubmitSuccess(false);
      setSubmitError("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          companyProfile: "Only PDF files are accepted.",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          companyProfile: "File size must be under 5MB.",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, companyProfile: file }));
      setErrors((prev) => ({ ...prev, companyProfile: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.contactName.trim())
        newErrors.contactName = "Contact person name is required";
      if (formData.mobile.length !== 10)
        newErrors.mobile = "Enter a valid 10-digit mobile number";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Enter a valid email address";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
    } else if (step === 2) {
      if (!formData.category || formData.category.length === 0) {
        newErrors.category = "Please select at least one vendor category";
      }
      if (
        formData.category.includes("Other") &&
        !formData.otherCategoryText.trim()
      ) {
        newErrors.otherCategoryText = "Please specify your service name";
      }
      if (!formData.experience) {
        newErrors.experience = "Please select your years of experience";
      }
      if (!formData.areasServed.trim()) {
        newErrors.areasServed = "Please specify areas/cities served";
      }

      // Required social link format check (Accepts website URL or Instagram profile URL)
      if (!formData.socialLink.trim()) {
        newErrors.socialLink = "Website or Instagram link is required";
      } else if (!URL_REGEX.test(formData.socialLink.trim())) {
        newErrors.socialLink =
          "Please enter a valid URL (e.g., https://instagram.com/handle)";
      }

      // Optional portfolio link format check (Only validates if the user types into it)
      if (
        formData.portfolioLink.trim() &&
        !URL_REGEX.test(formData.portfolioLink.trim())
      ) {
        newErrors.portfolioLink = "Please enter a valid portfolio web link URL";
      }
    } else if (step === 3) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      // Optional GST Number check (Passes if blank, but tests format if filled out)
      if (
        formData.gstNumber.trim() &&
        !GST_REGEX.test(formData.gstNumber.trim().toUpperCase())
      ) {
        newErrors.gstNumber =
          "Invalid GST structure format. Must be a valid 15-digit code.";
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("businessName", formData.businessName);
      formDataToSend.append("contactName", formData.contactName);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("category", JSON.stringify(formData.category));
      formDataToSend.append(
        "otherCategoryText",
        formData.otherCategoryText || "",
      );
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("areasServed", formData.areasServed);
      formDataToSend.append("teamSize", formData.teamSize || "");
      formDataToSend.append("socialLink", formData.socialLink.trim());
      formDataToSend.append(
        "portfolioLink",
        formData.portfolioLink.trim() || "",
      );
      formDataToSend.append(
        "gstNumber",
        formData.gstNumber.trim().toUpperCase() || "",
      );
      formDataToSend.append("address", formData.address);
      formDataToSend.append(
        "emergencyAvailability",
        formData.emergencyAvailability,
      );
      formDataToSend.append("aboutServices", formData.aboutServices || "");
      if (formData.companyProfile) {
        formDataToSend.append("companyProfile", formData.companyProfile);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vendor`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");

      setSubmitSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                <Store className="h-6 w-6 text-[#C9973A]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F5F0E8] tracking-wide">
                  Become a Verified Vendor
                </h2>
                <p className="text-xs text-[#8C7B6B]">
                  Join the Eventsaathi partner network
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
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="px-6 pt-4 pb-2 grid grid-cols-3 border-b border-[#8C7B6B]/10 bg-[#F5F0E8]/50 text-center text-xs font-semibold">
            <span
              className={
                currentStep >= 1
                  ? currentStep === 1
                    ? "text-[#7B1223]"
                    : "text-[#C9973A]"
                  : "text-[#8C7B6B]"
              }
            >
              1. Business Info
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
              2. Details & Portfolio
            </span>
            <span
              className={
                currentStep === 3 ? "text-[#7B1223]" : "text-[#8C7B6B]"
              }
            >
              3. Verification & Notes
            </span>
          </div>

          {/* Form Content Body */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {/* STEP 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Business / Company Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="e.g. Royal Decor Services"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.businessName ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.businessName && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.businessName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="e.g. Amit Shah"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.contactName ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.contactName && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.contactName}
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
                      placeholder="e.g. contact@domain.com"
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
                      placeholder="e.g. Mumbai"
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

            {/* STEP 2: Vendor Details & Portfolio */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Vendor Details
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-2">
                    Vendor Category *{" "}
                    <span className="text-[#8C7B6B] font-normal">
                      (Select Multiple)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = formData.category.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            let updatedCategories = [...formData.category];
                            if (isSelected) {
                              updatedCategories = updatedCategories.filter(
                                (item) => item !== cat,
                              );
                            } else {
                              updatedCategories.push(cat);
                            }

                            setFormData((prev) => ({
                              ...prev,
                              category: updatedCategories,
                              ...(!updatedCategories.includes("Other") && {
                                otherCategoryText: "",
                              }),
                            }));

                            if (errors.category)
                              setErrors((prev) => ({ ...prev, category: "" }));
                          }}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                            isSelected
                              ? "bg-[#7B1223] text-[#F5F0E8] border-[#7B1223]"
                              : "bg-white text-[#1C1C1C] border-[#8C7B6B]/30 hover:border-[#8C7B6B]"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                  {errors.category && (
                    <span className="text-xs text-[#D94F3D] mt-1 block">
                      {errors.category}
                    </span>
                  )}

                  {/* Other Category Input Field */}
                  {formData.category.includes("Other") && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                        Specify Your Service Name *
                      </label>
                      <input
                        type="text"
                        name="otherCategoryText"
                        value={formData.otherCategoryText}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (errors.otherCategoryText)
                            setErrors((prev) => ({
                              ...prev,
                              otherCategoryText: "",
                            }));
                        }}
                        placeholder="e.g. Mehendi Artist, Choreographer, Makeup Artist"
                        className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.otherCategoryText ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                      />
                      {errors.otherCategoryText && (
                        <span className="text-xs text-[#D94F3D] mt-0.5 block">
                          {errors.otherCategoryText}
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.experience ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    >
                      <option value="">Select experience range</option>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.experience && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.experience}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Team Size{" "}
                      <span className="text-[#8C7B6B] font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="number"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="e.g. 15"
                      className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Areas / Cities Served *
                  </label>
                  <input
                    type="text"
                    name="areasServed"
                    value={formData.areasServed}
                    onChange={handleInputChange}
                    placeholder="e.g. Delhi, Noida, Gurgaon"
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.areasServed ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.areasServed && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.areasServed}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Website / Instagram Link *
                    </label>
                    <input
                      type="url"
                      name="socialLink"
                      value={formData.socialLink}
                      onChange={handleInputChange}
                      placeholder="https://instagram.com/yourhandle"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.socialLink ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.socialLink && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.socialLink}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                      Portfolio Link{" "}
                      <span className="text-[#8C7B6B] font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="url"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleInputChange}
                      placeholder="e.g. Drive or Dropbox link"
                      className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.portfolioLink ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                    />
                    {errors.portfolioLink && (
                      <span className="text-xs text-[#D94F3D] mt-0.5 block">
                        {errors.portfolioLink}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Upload Company Profile{" "}
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
                    {formData.companyProfile ? (
                      <div className="flex items-center gap-1.5 text-xs text-[#7B1223] font-medium bg-[#7B1223]/5 px-2.5 py-1 rounded border border-[#7B1223]/20 max-w-xs truncate">
                        <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">
                          {formData.companyProfile.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8C7B6B]">
                        Accepts PDF only (Max 5MB)
                      </span>
                    )}
                  </div>
                  {errors.companyProfile && (
                    <span className="text-xs text-[#D94F3D] mt-1 block">
                      {errors.companyProfile}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Verification & Notes */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-[#1C1C1C] border-b border-[#8C7B6B]/20 pb-1">
                  Verification & Notes
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    GST Number{" "}
                    <span className="text-[#8C7B6B] font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 27AAPFU0939F1ZV"
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] uppercase ${errors.gstNumber ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.gstNumber && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.gstNumber}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="Enter complete office/studio business address"
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223] ${errors.address ? "border-[#D94F3D]" : "border-[#8C7B6B]/40"}`}
                  />
                  {errors.address && (
                    <span className="text-xs text-[#D94F3D] mt-0.5 block">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1.5">
                    Emergency Availability *
                  </label>
                  <div className="flex gap-3">
                    {["Yes", "No"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            emergencyAvailability: option,
                          }))
                        }
                        className={`w-24 py-2 text-sm font-bold rounded-lg border transition-all ${
                          formData.emergencyAvailability === option
                            ? "bg-[#7B1223] text-[#F5F0E8] border-[#7B1223]"
                            : "bg-transparent text-[#1C1C1C] border-[#8C7B6B]/40 hover:border-[#8C7B6B]"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-[#8C7B6B] italic mt-1.5">
                    "Can you take bookings within 2–3 days of an event?"
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1C1C1C] mb-1">
                    Tell us about your services{" "}
                    <span className="text-[#8C7B6B] font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="aboutServices"
                    value={formData.aboutServices}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Briefly showcase your setup specialization, crew capacity, packages, or standout events..."
                    className="w-full px-3 py-2 text-sm bg-white border border-[#8C7B6B]/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7B1223]"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Action Footer Navigation Buttons */}
          <div className="px-6 py-4 bg-[#F5F0E8] border-t border-[#8C7B6B]/20 flex flex-col gap-2">
            {submitError && (
              <p className="text-xs text-[#D94F3D] font-semibold text-center">
                {submitError}
              </p>
            )}
            {submitSuccess && (
              <p className="text-xs text-green-700 font-semibold text-center">
                ✓ Registration submitted! We'll review and get back to you.
              </p>
            )}
            <div className="flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold text-[#7B1223] hover:text-[#C9973A] transition-colors disabled:opacity-50"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
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
                  disabled={isSubmitting || submitSuccess}
                  className="flex items-center gap-1.5 bg-[#7B1223] text-[#F5F0E8] border border-[#C9973A] rounded-full px-7 py-2.5 text-sm font-bold shadow-md hover:bg-[#C9973A] hover:text-[#7B1223] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Register as Vendor →"
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
