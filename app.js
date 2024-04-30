const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Import routes
const authRouter = require("./routes/authRoutes");
const sampleRoute = require("./routes/sampleRoute");
const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "mydatabase" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes

// Auth routes and refresh access token
app.use("/", sampleRoute);
app.use("/auth", authRouter);

module.exports = app;
