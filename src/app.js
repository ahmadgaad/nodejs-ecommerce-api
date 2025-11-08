const express = require("express");
const morgan = require("morgan");

const app = express();

// Body parser middleware
app.use(express.json());

// Middleware for logging HTTP requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World after adding nodemon!");
});

module.exports = app;
