/* eslint-disable no-undef */
const express = require("express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const db = require("./config/dbConfig")
const CONFIG = require("./config/config")
const createProductTable  = require("./model/product")
const options = require("./config/swaggerOption")
const productRouter = require("./routes/product.router")
const paymentRouter = require("./routes/payment.router")

const app = express();

const specs = swaggerJsdoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

app.use(express.json())
app.use("/graemart-api/v1/product", productRouter)
app.use("/graemart-api/v1/payment", paymentRouter)

app.get("/", (req, res) => {
    res.status(200).send("welcome to express")
})

app.listen(CONFIG.PORT, () => {
    console.log("Server running on port: ", CONFIG.PORT)
})

db.connect()
createProductTable()

// Disconnect from the database when the process is terminated
// eslint-disable-next-line no-undef
process.on("SIGINT", async () => {
    try {
      await db.disconnect();
      process.exit(0);
    } catch (error) {
      console.error("Error occurred while disconnecting from the database:", error);
      process.exit(1);
    }
});
