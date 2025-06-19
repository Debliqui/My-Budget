function handleMongooseError(err) {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      msg: error.message,
      path: error.path,
    }))
    return { status: 400, errors }
  }

  if (err.code === 11000) {
    const errors = Object.keys(err.keyValue).map((field) => ({
      msg: `The input field is invalid`,
      path: field,
    }))
    return { status: 400, errors }
  }

  return { status: 500, errors: [{ msg: "Unknown server error" }] }
}

module.exports = { handleMongooseError }
