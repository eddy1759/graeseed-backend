const express = require("express");
const { getClient } = require("../config/dbConfig")
const router = express.Router()

/**
 * @swagger
 * /invoice:
 *   post:
 *     summary: Generate invoice
 *     description: Create an invoice for the specified user and items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user
 *               items:
 *                 type: array
 *                 description: List of items
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Name of the item
 *                     qty:
 *                       type: integer
 *                       description: Quantity of the item
 *                     price:
 *                       type: number
 *                       description: Price of the item
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   description: ID of the user
 *                 userName:
 *                   type: string
 *                   description: Name of the user
 *                 items:
 *                   type: array
 *                   description: List of items
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the item
 *                       qty:
 *                         type: integer
 *                         description: Quantity of the item
 *                       price:
 *                         type: number
 *                         description: Price of the item
 *                 totalPrice:
 *                   type: number
 *                   description: Total price of the invoice
 */
router.post("/invoice", async (req, res) => {
    try {
      const { userId, items } = req.body;
  
      // Fetch the user details from the database
      const userQuery = "SELECT * FROM users_user  WHERE id = $1";
      const userResult = await getClient().query(userQuery, [userId]);
      const user = userResult.rows[0];
        
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Calculate the total price
      let totalPrice = 0;
      for (const item of items) {
        totalPrice += item.price * item.qty;
      }
  
      // Create the invoice
      const invoice = {
        userId: user.id,
        userName: user.username,
        items,
        totalPrice, // Include the total price in the invoice
      };
      // Return the invoice
      res.status(200).json({
          "invoice": invoice 
      });
    } catch (error) {
      console.error("Error generating invoice:", error)
      res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router