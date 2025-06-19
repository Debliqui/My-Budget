const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/userCtrl")

const auth = require("../middleware/auth")
const { validateRegister } = require("../middleware/validator")
const { loginLimiter } = require("../middleware/rateLimiter")

router.post("/signup", validateRegister, userCtrl.signup)

router.post("/login", loginLimiter, userCtrl.login)

router.post("/logout", auth, (req, res) => {
  res.status(200).json({ message: "Successfully logged out." })
})

router.get("/profile", auth, userCtrl.getUserProfile)

router.put("/profile", auth, userCtrl.updateUserProfile)

module.exports = router
