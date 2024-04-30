const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // Password must not be empty and should be at least 8 characters long
  return password && password.length >= 8;
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(req.headers["authorization"]);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { validateEmail, validatePassword, verifyToken };
