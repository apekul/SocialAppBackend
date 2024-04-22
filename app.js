const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const authRouter = require("./routes/authRoutes");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

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
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Authentication routes
app.use("/auth", authRouter);

module.exports = app;
