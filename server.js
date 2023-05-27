/* eslint-disable no-undef */
const express = require("express")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const db = require("./config/dbConfig")
const CONFIG = require("./config/config")
const options = require("./config/swaggerOption")

const app = express();
db.connect()

const specs = swaggerJsdoc(options)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
)

app.get("/", (req, res) => {
    res.status(200).send("welcome to express")
})

app.listen(CONFIG.PORT, () => {
    console.log("Server running on port: ", CONFIG.PORT)
})

// Gracefully disconnect from the database when the process is terminated
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
