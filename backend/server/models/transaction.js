const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true, min: -1000000, max: 1000000 },
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, trim: true },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Transaction", transactionSchema)
