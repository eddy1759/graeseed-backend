/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();

const CONFIG = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = CONFIG;