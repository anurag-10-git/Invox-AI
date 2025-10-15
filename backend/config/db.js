const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose(process.env.MONGO_URI, {});
    console.log("MongoDB connected")
  } catch (err) {
    console.error("Error connecting MongoDB", err)
    process.exit(1)
  }
}

module.exports = connectDB;