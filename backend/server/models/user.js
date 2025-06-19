const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v)
      },
      message: (props) => `${props.value} n'est pas un email valide`,
    },
  },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, required: true, unique: true },
})

userSchema.plugin(uniqueValidator, {
  message: "The input field is invalid",
})

module.exports = mongoose.model("User", userSchema)
