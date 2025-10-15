const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const adminAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token not found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Find user by ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach user to the request
    req.user = user;
    next();
  } catch (error) {
    console.error("Admin authentication error:", error.message);
    res.status(401).json({ error: "Unauthorized: " + error.message });
  }
};

module.exports = { adminAuthenticate };
