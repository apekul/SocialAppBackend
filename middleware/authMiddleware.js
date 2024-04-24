const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const { generateAccessToken } = require("../helpers/tokenHelpers");

async function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
    if (err) {
      // Token verification failed
      if (err.name === "TokenExpiredError") {
        // If token is expired, check if refresh token exists
        try {
          const refreshTokenEntry = await RefreshToken.findOne({
            userId: decoded.userId,
          });
          if (refreshTokenEntry) {
            // If refresh token exists, generate a new access token
            const newAccessToken = generateAccessToken(
              decoded.userId,
              decoded.username
            );
            req.newAccessToken = newAccessToken; // Store new access token in request
          }
        } catch (error) {
          console.error("Error checking refresh token:", error);
        }
      }
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Token is valid, save decoded token data to request for future use
      req.user = decoded;

      // New access token has been generated, continue with it
      next();
    }
  });
}

module.exports = { verifyToken };
