const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  validateUsername,
} = require("./validators");

exports.register = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;

    // Validate username
    if (!validateUsername(username)) {
      return res.status(400).json({ message: "Invalid username" });
    }

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
      username,
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
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user details
    res.status(200).json({
      token,
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
