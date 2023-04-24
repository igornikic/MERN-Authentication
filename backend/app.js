const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

// Load env variables with dotenv in DEVELOPMENT mode
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// Importing all routes
const auth = require("./routes/auth");

// Application-level middlewares
app.use("/api", auth);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
