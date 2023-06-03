const insertProducts = require("../services/product.service")
const { getClient } = require("../config/dbConfig")


const createProductAndInvoice = async (req, res) => {
    try {
        const { userId, products } = req.body;
    
        // Fetch the user details from the database
        const userQuery = "SELECT * FROM users_user WHERE id = $1";
        const userResult = await getClient().query(userQuery, [userId]);
        const user = userResult.rows[0];
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        // Insert the products into the database
        const createdProducts = await insertProducts(products, userId);
    
        // Calculate the total price
        let totalPrice = 0;
        for (const createdProduct of createdProducts) {
            totalPrice += createdProduct.price * createdProduct.quantity;
        }

        // Create the invoice
        const invoice = {
            items: createdProducts.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            })),
            totalPrice,
        }
    
        // Return the invoice
        res.status(200).json({ invoice });
      } catch (error) {
        console.error("An error occurred generating invoice", error);
        res.status(500).json({ error: "Internal server error" });
      }
}

// Retrieve all products
const getAllPrdouct =  async (req, res) => {
    try {
      const selectQuery = "SELECT * FROM product";
      const result = await getClient().query(selectQuery);
      const products = result.rows;
      res.status(200).json({ products });
    } catch (error) {
      console.error("An error occurred retrieving products", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    createProductAndInvoice,
    getAllPrdouct
}
