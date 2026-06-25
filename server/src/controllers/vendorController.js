const Vendor = require("../models/Vendor");

// POST /api/vendor
const submitVendor = async (req, res) => {
  try {
    const {
      businessName,
      contactName,
      mobile,
      email,
      city,
      state,
      category,
      otherCategoryText,
      experience,
      areasServed,
      teamSize,
      socialLink,
      portfolioLink,
      gstNumber,
      address,
      emergencyAvailability,
      aboutServices,
    } = req.body;

    // category aata hai JSON string as array from FormData
    let parsedCategory = category;
    if (typeof category === "string") {
      try {
        parsedCategory = JSON.parse(category);
      } catch {
        parsedCategory = [category];
      }
    }

    const vendor = await Vendor.create({
      businessName,
      contactName,
      mobile,
      email,
      city,
      state,
      category: parsedCategory,
      otherCategoryText: otherCategoryText || "",
      experience,
      areasServed,
      teamSize: teamSize || "",
      socialLink,
      portfolioLink: portfolioLink || "",
      companyProfilePath: req.file ? req.file.filename : "",
      gstNumber: gstNumber || "",
      address,
      emergencyAvailability: emergencyAvailability || "No",
      aboutServices: aboutServices || "",
    });

    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    console.error("Vendor submit error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitVendor, getVendors };
