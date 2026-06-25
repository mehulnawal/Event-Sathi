const mongoose = require("mongoose");

const saathisSchema = new mongoose.Schema(
  {
    guestManagement: { type: Number, default: 0 },
    porterService: { type: Number, default: 0 },
    shadowService: { type: Number, default: 0 },
    foodBeverages: { type: Number, default: 0 },
    vendorManagement: { type: Number, default: 0 },
    artistManagement: { type: Number, default: 0 },
    productionManager: { type: Number, default: 0 },
    ritualManagement: { type: Number, default: 0 },
    logisticsManagement: { type: Number, default: 0 },
    valetManagement: { type: Number, default: 0 },
    elderPeople: { type: Number, default: 0 },
    nannyKids: { type: Number, default: 0 },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["booking", "tatkal"],
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    emailAddress: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    eventType: { type: String, required: true },
    customEventType: { type: String, default: "" },
    eventDate: { type: String, required: true },
    eventLocation: { type: String, required: true, trim: true },
    guestCount: { type: String, required: true },
    estimatedBudget: { type: String, default: "" },
    saathis: { type: saathisSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
