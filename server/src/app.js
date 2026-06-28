require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

// DB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "https://k6304119-3000.inc1.devtunnels.ms",
      "https://k6304119-5000.inc1.devtunnels.ms",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-admin-token"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded PDFs
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ─── Routes ──────────────────────────────────────────────────
app.use("/api", routes);

// ─── Health Check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "EventSathi API running" });
});

// ─── Error Handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
