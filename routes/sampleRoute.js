const express = require("express");
const router = express.Router();
const validators = require("../middleware/validators");

router.get("/", validators.verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to API" });
});

module.exports = router;
