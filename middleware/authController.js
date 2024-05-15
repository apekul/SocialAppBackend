const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEmail, validatePassword } = require("./validators");
const RefreshToken = require("../models/RefreshToken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/tokenHelpers");

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

    // check if email and password are not empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    // Get user from db that match provided email, return error if user with email dont exists
    const user = await User.findOne({ email });
    !user && res.status(401).json({ message: "Invalid email" });

    // Compare password and return error if dont match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // !passwordMatch && res.status(401).json({ message: "Invalid password" });

    // get user info
    const { _id, name, lastname } = user;

    // generate tokens
    const accessToken = generateAccessToken(email, _id, name, lastname);
    const newRefreshToken = generateRefreshToken(email, _id, name, lastname);

    // Check if refresh token exist in db
    const existingRefreshToken = await RefreshToken.findOne({
      userId: _id,
    });
    if (existingRefreshToken) {
      // If a refresh token already exists, update it
      existingRefreshToken.refreshToken = newRefreshToken;
      await existingRefreshToken.save();
    } else {
      // If no refresh token exists, create a new one
      const refreshTokenEntry = new RefreshToken({
        userId: user._id,
        refreshToken: newRefreshToken,
      });
      await refreshTokenEntry.save();
    }

    // return to user tokens and redirectUrl
    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

exports.logout = async (req, res) => {
  // Implement logout logic here
  res.status(201).json({ message: "User logout successfully" });
};

// refresh access token
exports.refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  !refreshToken && res.status(401).json({ error: "Invalid refresh token" });
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    // get decoded values
    const { email, _id, name, lastname } = decoded;
    // generate new access token
    const newAccessToken = generateAccessToken(email, _id, name, lastname);

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token." });
  }
};
