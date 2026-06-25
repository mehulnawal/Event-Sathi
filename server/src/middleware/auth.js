const adminAuth = (req, res, next) => {
  const token = req.headers["x-admin-token"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (token !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  next();
};

module.exports = adminAuth;
