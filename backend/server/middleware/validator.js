const { body } = require("express-validator")
const zxcvbn = require("zxcvbn")

const validateRegister = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must contain at least 8 characters")
    .custom((value) => {
      const { score } = zxcvbn(value)
      if (score < 3) throw new Error("Password too weak")
      return true
    }),

  body("userName")
    .isLength({ min: 3 })
    .withMessage("Username must contain at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("User names must contain only letters, digits or underscores"),
]

module.exports = { validateRegister }
