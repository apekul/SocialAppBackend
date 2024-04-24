const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Function to generate a new access token
function generateAccessToken(userId, username) {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // Example expiry time, adjust as needed
  );
}

// Function to generate a refresh token
function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

module.exports = { generateAccessToken, generateRefreshToken };
