const { getClient } = require("../config/dbConfig")

async function insertProducts(products, userId) {
    try {
      const values = products.map((product) => {
        const { name, price, quantity } = product;
        return `('${name}', ${price}, ${quantity}, ${userId})`;
      });
  
      const insertQuery = `
        INSERT INTO product (name, price, quantity, userId)
        VALUES ${values.join(",")}
        RETURNING *
      `;
  
      const result = await getClient().query(insertQuery);
      const createdProducts = result.rows;
    //   console.log("Products inserted successfully", createdProducts);
      return createdProducts;
    } catch (error) {
      console.error("An error occurred while inserting products", error);
      throw error;
    }
  }
  
  module.exports = insertProducts
  