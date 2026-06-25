const Enquiry = require("../models/Enquiry");
const Vendor = require("../models/Vendor");
const CityPartner = require("../models/CityPartner");

// POST /api/admin/login
const adminLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username and password required" });
  }

  // Check against all 5 admin slots in .env
  let isValid = false;
  for (let i = 1; i <= 5; i++) {
    const envUser = process.env[`ADMIN_${i}_USERNAME`];
    const envPass = process.env[`ADMIN_${i}_PASSWORD`];
    if (envUser && envPass && username === envUser && password === envPass) {
      isValid = true;
      break;
    }
  }

  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  res.status(200).json({
    success: true,
    token: process.env.ADMIN_SECRET_TOKEN,
    username,
  });
};

// GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    const [bookings, tatkal, vendors, cityPartners] = await Promise.all([
      Enquiry.countDocuments({ type: "booking" }),
      Enquiry.countDocuments({ type: "tatkal" }),
      Vendor.countDocuments(),
      CityPartner.countDocuments(),
    ]);

    // Recent 5 of each
    const [recentBookings, recentTatkal, recentVendors, recentCityPartners] =
      await Promise.all([
        Enquiry.find({ type: "booking" })
          .sort({ createdAt: -1 })
          .limit(5)
          .select("fullName city eventType createdAt"),
        Enquiry.find({ type: "tatkal" })
          .sort({ createdAt: -1 })
          .limit(5)
          .select("fullName city eventType createdAt"),
        Vendor.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select("businessName city category createdAt"),
        CityPartner.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select("fullName targetCity createdAt"),
      ]);

    res.status(200).json({
      success: true,
      data: {
        counts: { bookings, tatkal, vendors, cityPartners },
        recent: { recentBookings, recentTatkal, recentVendors, recentCityPartners },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { adminLogin, getStats };
