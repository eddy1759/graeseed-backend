const { Client } = require("pg");
const CONFIG = require("./config")

let client;

async function connect() {
    client = new Client({
        // eslint-disable-next-line no-undef
        connectionString: CONFIG.DB_URL,
        ssl: {
            rejectUnauthorized: false
        },
    });

    try {
        await client.connect();
        console.log("Connected to database successful")
    } catch (error) {
        console.error("Error connectiong to database", error);
    }
}

async function disconnect() {
    try {
        await client.end();
        console.log("Disconnected from the database!");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
        throw error;
    }
}

module.exports = {
    connect,
    disconnect,
    getClient: () => client,
}



