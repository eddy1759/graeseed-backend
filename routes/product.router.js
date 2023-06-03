const express = require("express");
const { createProductAndInvoice, getAllPrdouct } = require("../controller/product.controller")

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
router.post("/invoice", createProductAndInvoice)

/**
 * @swagger
 * /:
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


module.exports = router