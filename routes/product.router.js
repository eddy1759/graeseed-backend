const express = require("express")

const { createProductAndInvoice, 
    getAllPrdouct, 
    getProductByUser, 
    deleteProductByUser, 
    getProductWithUserDetails

} = require("../controller/product.controller")



const { authenticateMW, paramIsValidId } = require("../middleware/index")

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the product
 *         name:
 *           type: string
 *           description: Name of the product
 *         price:
 *           type: number
 *           description: Price of the product
 *         quantity:
 *           type: integer
 *           description: Quantity of the product
 *         userId:
 *           type: integer
 *           description: ID of the user associated with the product
 *     Invoice:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID of the user
 *         product:
 *           type: array
 *           description: List of items
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     Payment:
 *       type: object
 *       properties:
 *         cardName:
 *           type: string
 *           description: The debit card name
 *         cardNumber:
 *           type: number
 *           description: The debit card number
 *         month:
 *           type: integer
 *           description: card expiring month
 *         year:
 *           type: integer
 *           description: card expiring year
 *         cc:
 *           type: integer
 *           description: card cvv
 */


/**
 * @swagger
 * /graemart-api/v1/product/invoice:
 *   post:
 *     summary: Generate invoice
 *     description: Create an invoice for the specified user and items
 *     security:
 *       - bearerAuth: []
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
router.post("/invoice", authenticateMW, createProductAndInvoice)


/**
 * @swagger
 * /graemart-api/v1/product/:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieves a list of all products.
 *     responses:
 *       200:
 *         description: Successfully retrieved the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of the internal server error.
 */
router.get("/", getAllPrdouct)


/**
 * @swagger
 * /graemart-api/v1/product/{id}:
 *   get:
 *     summary: Retrieve products based on user ID
 *     description: Retrieves a list of products associated with the provided user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to retrieve products for.
 *     responses:
 *       200:
 *         description: Successfully retrieved the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", paramIsValidId, getProductByUser)


/**
 * @swagger
 * /graemart-api/v1/product/{id}:
 *   delete:
 *     summary: Delete product based on user ID
 *     description: Deletes all products associated with the provided user ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to delete products for.
 *     responses:
 *       200:
 *         description: Products deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", paramIsValidId, deleteProductByUser)


/**
 * @swagger
 * /graemart-api/v1/product/user/{id}:
 *   get:
 *     summary: Retrieve and populate products by user ID
 *     description: Retrieves a list of products and populates them with user details based on the provided user ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID to retrieve and populate products for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved and populated the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the user was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating the cause of the internal server error.
 */
router.get("/user/:id", paramIsValidId, getProductWithUserDetails)


module.exports = router