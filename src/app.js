const express = require("express");
const morgan = require("morgan");

const categoryRoutes = require("./routes/categoryRoute.js");

const app = express();

// Body parser middleware
app.use(express.json());

// Middleware for logging HTTP requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", categoryRoutes);

module.exports = app;
