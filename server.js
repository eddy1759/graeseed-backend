/* eslint-disable no-undef */
const express = require("express");
const db = require("./config/dbConfig")
const CONFIG = require("./config/config")

const app = express();
db.connect()

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
