const CityPartner = require("../models/CityPartner");

// POST /api/city-partner
const submitCityPartner = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      city,
      state,
      currentOccupation,
      organizationName,
      experienceYears,
      linkedinProfile,
      targetCity,
      hasVendorNetwork,
      vendorConnectionsCount,
      hasEventExperience,
      whyJoin,
      howContribute,
      socialMediaLinks,
      agreedDeclaration,
    } = req.body;

    const cityPartner = await CityPartner.create({
      fullName,
      mobile,
      email,
      city,
      state,
      currentOccupation,
      organizationName: organizationName || "",
      experienceYears,
      linkedinProfile: linkedinProfile || "",
      targetCity,
      hasVendorNetwork: hasVendorNetwork || "No",
      vendorConnectionsCount: vendorConnectionsCount || "",
      hasEventExperience: hasEventExperience || "No",
      whyJoin,
      howContribute,
      resumeFilePath: req.file ? req.file.filename : "",
      socialMediaLinks: socialMediaLinks || "",
      agreedDeclaration: agreedDeclaration === "true" || agreedDeclaration === true,
    });

    res.status(201).json({ success: true, data: cityPartner });
  } catch (error) {
    console.error("CityPartner submit error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/admin/city-partners
const getCityPartners = async (req, res) => {
  try {
    const partners = await CityPartner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitCityPartner, getCityPartners };
