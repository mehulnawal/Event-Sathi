const mongoose = require("mongoose");

const cityPartnerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    currentOccupation: { type: String, required: true, trim: true },
    organizationName: { type: String, default: "" },
    experienceYears: { type: String, required: true },
    linkedinProfile: { type: String, default: "" },
    targetCity: { type: String, required: true, trim: true },
    hasVendorNetwork: { type: String, enum: ["Yes", "No"], default: "No" },
    vendorConnectionsCount: { type: String, default: "" },
    hasEventExperience: { type: String, enum: ["Yes", "No"], default: "No" },
    whyJoin: { type: String, required: true },
    howContribute: { type: String, required: true },
    resumeFilePath: { type: String, default: "" },
    socialMediaLinks: { type: String, default: "" },
    agreedDeclaration: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CityPartner", cityPartnerSchema);
