const express = require("express");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const categoryRoutes = require("./routes/categoryRoute.js");

const app = express();

// Body parser middleware
app.use(express.json());

// Middleware for logging HTTP requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1", categoryRoutes);

// Global error handler for unhandled routes
app.use((req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware for all errors
app.use(globalErrorHandler);

module.exports = app;
