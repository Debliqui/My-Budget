const mongoose = require("mongoose")

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("✅ MongoDB connected")
    } catch (error) {
      console.error("❌ MongoDB connection error:", error)
      throw new Error(error)
    }
  } else {
    console.log("ℹ️ MongoDB already connected")
  }
}

module.exports = connectDB
