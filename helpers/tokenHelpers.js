const jwt = require("jsonwebtoken");

// Function to generate a new access token
function generateAccessToken(email, _id, name, lastname) {
  return jwt.sign({ email, _id, name, lastname }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
}

// Function to generate a refresh token
function generateRefreshToken(email, _id, name, lastname) {
  return jwt.sign({ email, _id, name, lastname }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
