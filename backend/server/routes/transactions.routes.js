const express = require("express")
const router = express.Router()

const transactionCtrl = require("../controllers/transactionCtrl")

router.get("/", transactionCtrl.getAllTransaction)
router.get("/:id", transactionCtrl.getOneTransaction)
router.post("/", transactionCtrl.createTransaction)
router.put("/:id", transactionCtrl.updateOneTransaction)
router.delete("/:id", transactionCtrl.deleteOneTransaction)

module.exports = router
