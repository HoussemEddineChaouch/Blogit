const mongoose = require("mongoose");
const { config } = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(config.stringConnection);
    console.log("🚀 Blogit database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
