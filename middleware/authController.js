const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/tokenHelpers");
const { validateEmail, validatePassword } = require("./validators");
const RefreshToken = require("../models/RefreshToken");

exports.register = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, lastname, email, password } = req.body;

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name: name || "",
      lastname: lastname || "",
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find if email exists
    const user = await User.findOne({ email: email });

    // If user is not found, return error
    if (!user) {
      return res.status(401).json({ message: "Invalid username or email" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const accessToken = generateAccessToken(user._id, user.email);

    // Generate Refresh JWT token/ check if token already exists
    const existingRefreshTokenEntry = await RefreshToken.findOne({
      userId: user._id,
    });

    if (existingRefreshTokenEntry) {
      // If a refresh token already exists, update it
      existingRefreshTokenEntry.refreshToken = generateRefreshToken();
      await existingRefreshTokenEntry.save();
    } else {
      // If no refresh token exists, create a new one
      const refreshTokenEntry = new RefreshToken({
        userId: user._id,
        refreshToken: generateRefreshToken(),
      });
      await refreshTokenEntry.save();
    }

    // Return token and user details
    res.status(200).json({
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.logout = async (req, res) => {
  // Implement logout logic here
  res.status(201).json({ message: "User logout successfully" });
};
