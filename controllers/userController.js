const User = require("../models/userModel.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    // Validate request payload
    if (!emailOrMobile || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if identifier is email or mobile
    let user;
    const identifier = String(emailOrMobile);
    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ mobile: identifier });
    }

    // If user not found
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // Compare password
    if (!user.password) {
      return res
        .status(400)
        .json({ msg: "Password is not set for this account" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const JWT_SECRET = "yourHardcodedSecret123";
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      // expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
