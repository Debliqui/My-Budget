const Transaction = require("../models/transaction")

module.exports.getAllTransaction = async (req, res, next) => {
  Transaction.find({ userId: req.auth.userId })
    .then((transactions) => {
      res.status(200).json(transactions)
    })
    .catch((error) => {
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    })
}
module.exports.getOneTransaction = (req, res, next) => {
  Transaction.findOne({
    _id: req.params.id,
    userId: req.auth.userId,
  })
    .then((transaction) => {
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" })
      }
      return res.status(200).json(transaction)
    })
    .catch((error) => {
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    })
}
module.exports.createTransaction = (req, res, next) => {
  const { title, amount, type, date } = req.body
  if (!title || !amount || !type || !date) {
    return res.status(400).json({ error: "Invalid input." })
  }

  const dateOnly = new Date(req.body.date)
  dateOnly.setUTCHours(0, 0, 0, 0)

  const transaction = new Transaction({
    ...req.body,
    userId: req.auth.userId,
    date: dateOnly,
  })
  transaction
    .save()
    .then(() =>
      res.status(201).json({ message: "Transaction created successfully !" })
    )
    .catch((error) => {
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    })
}
module.exports.updateOneTransaction = (req, res, next) => {
  const transaction = new Transaction({ ...req.body })
  Transaction.updateOne(
    { _id: req.params.id, userId: req.auth.userId },
    transaction
  )
    .then(() => {
      res.status(201).json({
        message: "Transaction updated Successfully!",
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    })
}
module.exports.deleteOneTransaction = (req, res, next) => {
  Transaction.deleteOne({ _id: req.params.id, userId: req.auth.userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Transaction not found or not yours" })
      } else {
        return res.status(200).json({ message: "Transaction deleted!" })
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Erreur serveur", details: error.message })
    })
}
