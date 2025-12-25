const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

/**
 * REGISTER USER
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Send response (NO PASSWORD)
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * LOGIN USER
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user WITH password (needed for matchPassword)
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send response (NO PASSWORD)
    res.json({
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { register, login };
