const jwt = require("jsonwebtoken");

// Function to generate a new access token
function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Function to generate a refresh token
function generateRefreshToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
