const express = require("express");
const router = express.Router();

const { submitEnquiry, getBookings, getTatkal } = require("../controllers/enquiryController");
const { submitVendor, getVendors } = require("../controllers/vendorController");
const { submitCityPartner, getCityPartners } = require("../controllers/cityPartnerController");
const { adminLogin, getStats } = require("../controllers/adminController");
const adminAuth = require("../middleware/auth");
const upload = require("../middleware/upload");

// ─── Public Routes ───────────────────────────────────────────
router.post("/enquiry", submitEnquiry);
router.post("/vendor", upload.single("companyProfile"), submitVendor);
router.post("/city-partner", upload.single("resumeFile"), submitCityPartner);

// ─── Admin Auth ──────────────────────────────────────────────
router.post("/admin/login", adminLogin);

// ─── Admin Protected Routes ──────────────────────────────────
router.get("/admin/stats", adminAuth, getStats);
router.get("/admin/bookings", adminAuth, getBookings);
router.get("/admin/tatkal", adminAuth, getTatkal);
router.get("/admin/vendors", adminAuth, getVendors);
router.get("/admin/city-partners", adminAuth, getCityPartners);

module.exports = router;
