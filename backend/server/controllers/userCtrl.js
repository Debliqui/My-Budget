const { validationResult } = require("express-validator")
const { handleMongooseError } = require("../utils/errors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

exports.signup = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const cleanedErrors = errors.array().map(({ msg, path, location }) => ({
      msg,
      path,
      location,
    }))
    return res.status(400).json({ errors: cleanedErrors })
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((err) => {
          const { status, errors } = handleMongooseError(err)
          return res.status(status).json({ errors })
        })
    })
    .catch((err) => {
      return res.status(500).json({ error: "Password hash error" })
    })
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Incorrect login/password pair" })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Incorrect login/password pair" })
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
              expiresIn: "24h",
            }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) =>
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    )
}

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found." })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error("Profile error :", error)
    res.status(500).json({ error: "Server error", details: error.message })
  }
}

exports.updateUserProfile = async (req, res) => {
  try {
    const allowedFields = ["firstName", "lastName", "userName"]
    const updates = {}

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.auth.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password")

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({
      message: "Profile successfully updated.",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Profile update error :", error)
    res.status(500).json({ error: "Server error", details: error.message })
  }
}
