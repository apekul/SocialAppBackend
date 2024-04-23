var express = require("express");
var router = express.Router();
var authMiddleware = require("../middleware/authMiddleware");

/* GET home page. */
router.get("/", authMiddleware.verifyToken, function (req, res, next) {
  res.send("Welcome to your API!");
});

module.exports = router;
