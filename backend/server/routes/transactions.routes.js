const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const requireUser = require("../middleware/requireUser")

const transactionCtrl = require("../controllers/transactionCtrl")

router.use(auth, requireUser)
router.get("/", auth, transactionCtrl.getAllTransaction)
router.get("/:id", auth, transactionCtrl.getOneTransaction)
router.post("/", auth, transactionCtrl.createTransaction)
router.put("/:id", auth, transactionCtrl.updateOneTransaction)
router.delete("/:id", auth, transactionCtrl.deleteOneTransaction)

module.exports = router
