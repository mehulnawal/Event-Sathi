const Enquiry = require("../models/Enquiry");

// POST /api/enquiry
const submitEnquiry = async (req, res) => {
  try {
    const {
      type,
      fullName,
      mobileNumber,
      emailAddress,
      city,
      eventType,
      customEventType,
      eventDate,
      eventLocation,
      guestCount,
      estimatedBudget,
      saathis,
    } = req.body;

    if (!["booking", "tatkal"].includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid enquiry type" });
    }

    const enquiry = await Enquiry.create({
      type,
      fullName,
      mobileNumber,
      emailAddress,
      city,
      eventType,
      customEventType: customEventType || "",
      eventDate,
      eventLocation,
      guestCount,
      estimatedBudget: estimatedBudget || "",
      saathis: saathis || {},
    });

    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    console.error("Enquiry submit error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Enquiry.find({ type: "booking" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/tatkal
const getTatkal = async (req, res) => {
  try {
    const tatkal = await Enquiry.find({ type: "tatkal" }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: tatkal });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitEnquiry, getBookings, getTatkal };
