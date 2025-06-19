const express = require("express")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const yaml = require("yamljs")
const swaggerDocs = yaml.load("./swagger.yaml")
require("dotenv").config()
const connectDB = require("./config/db")
const helmet = require("helmet")

const app = express()
const PORT = process.env.PORT || 3001

const transactionRoutes = require("./routes/transactions.routes")
const userRoutes = require("./routes/user.routes")

// Connect to the database
connectDB()

// Handle CORS issues
app.use(cors())

// HTTP Secure
app.use(helmet())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use("/api/v1/transactions", transactionRoutes)
app.use("/api/v1/auth", userRoutes)

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get("/", (req, res, next) => {
  res.send("MyBudget backend is running!")
})

// Handle routes not found
app.use((req, res) => res.status(404).send("Route not found :/"))

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
