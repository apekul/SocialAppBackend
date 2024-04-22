var express = require("express");
var router = express.Router();
var authMiddleware = require("../middleware/authMiddleware");
/* GET users listing. */
router.get("/", authMiddleware.verifyToken, function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
