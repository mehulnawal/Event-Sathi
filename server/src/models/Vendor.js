const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    category: { type: [String], required: true },
    otherCategoryText: { type: String, default: "" },
    experience: { type: String, required: true },
    areasServed: { type: String, required: true, trim: true },
    teamSize: { type: String, default: "" },
    socialLink: { type: String, required: true, trim: true },
    portfolioLink: { type: String, default: "" },
    companyProfilePath: { type: String, default: "" },
    gstNumber: { type: String, default: "" },
    address: { type: String, required: true, trim: true },
    emergencyAvailability: { type: String, enum: ["Yes", "No"], default: "No" },
    aboutServices: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
