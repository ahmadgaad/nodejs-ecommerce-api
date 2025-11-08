const dotenv = require("dotenv");
const app = require("./app");
const dbConnection = require("./config/db");

// Load environment variables from config.env file
dotenv.config({ path: "config.env" });

// Connect to MongoDB
dbConnection();

const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
