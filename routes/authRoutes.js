const express = require("express");
const router = express.Router();
const authController = require("../middleware/authController");

// Route for user registration
router.post("/register", authController.register);

// Route for user login
router.post("/login", authController.login);

// Route for user logout
router.post("/logout", authController.logout);

// Route for refreshing access token
router.post("/refresh-token", authController.refresh);

module.exports = router;
