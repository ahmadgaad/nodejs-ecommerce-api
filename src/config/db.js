const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URI);
    console.log(`✅ MongoDB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
