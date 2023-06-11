const insertProducts = require("../services/product.service")
const { getClient } = require("../config/dbConfig")
const { calculateVAT, deliveryFee } = require("../utils/helper")


const createProductAndInvoice = async (req, res) => {
    try {
        const { products } = req.body
        const username = req.user
    
        // Fetch the user details from the database
        const userQuery = "SELECT * FROM users_user WHERE username = $1";
        const userResult = await getClient().query(userQuery, [username]);
        const user = userResult.rows[0];
    
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const userId = user.id
        // Insert the products into the database
        const createdProducts = await insertProducts(products, userId);
    
        // Calculate the total price
        let totalPrice = 0;
        for (const createdProduct of createdProducts) {
            totalPrice += createdProduct.price * createdProduct.quantity;
        }

        const vat = parseFloat(calculateVAT(totalPrice))

        // Create the invoice
        const invoice = {
            items: createdProducts.map((product) => ({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
            })),
            subtotal: totalPrice,
            deliveryFee: deliveryFee,
            Total: totalPrice + deliveryFee + vat
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

// Retrieve products based on user ID
const getProductByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = "SELECT * FROM product WHERE userId = $1";
    const result = await getClient().query(selectQuery, [id]);
    const products = result.rows;
    res.status(200).json({ products });
  } catch (error) {
    console.error("An error occurred retrieving products", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// Delete product based on user ID
const deleteProductByUser =  async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM product WHERE userId = $1";
    await getClient().query(deleteQuery, [id]);
    res.status(200).json({ message: "Products deleted successfully" });
  } catch (error) {
    console.error("An error occurred deleting products", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


const getProductWithUserDetails =  async (req, res) => {
  try {
    const { id } = req.params;
    const selectQuery = "SELECT p.*, u.name AS user_name, u.email AS user_email FROM product p INNER JOIN users_user u ON p.userId = u.id WHERE p.userId = $1";
    const result = await getClient().query(selectQuery, [id]);
    const products = result.rows;
    res.status(200).json({ products });
  } catch (error) {
    console.error("An error occurred retrieving and populating products", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
    createProductAndInvoice,
    getAllPrdouct,
    getProductByUser,
    deleteProductByUser,
    getProductWithUserDetails
}
