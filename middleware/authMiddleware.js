const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Get the token from the request headers
  var token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      // Token verification failed
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Token is valid, save decoded token data to request for future use
      req.user = decoded;
      next(); // Proceed to next middleware or route handler
    }
  });
}

module.exports = { verifyToken };