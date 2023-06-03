const { getClient } = require("../config/dbConfig")


async function createProductTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS product (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price FLOAT NOT NULL,
          quantity INTEGER NOT NULL,
          userId INTEGER NOT NULL REFERENCES users_user(id)
        )
      `;
      await getClient().query(createTableQuery);
      console.log("Product table created successfully");
    } catch (error) {
      console.error("An error occurred while creating the Product table", error);
    }
  }
  
module.exports = createProductTable
