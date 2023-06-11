const express = require("express")

const { authenticateMW } = require("../middleware/index")
const paymentHandler = require("../controller/payment.controller")


const router = express.Router()

/**
 * @swagger
 * /graemart-api/v1/payment:
 *   post:
 *     summary: Process payment
 *     description: Process a payment with the provided card details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *                 description: Name on the card
 *               cardNumber:
 *                 type: string
 *                 description: Card number
 *               month:
 *                 type: integer
 *                 description: Expiry month of the card
 *               year:
 *                 type: integer
 *                 description: Expiry year of the card
 *               cvv:
 *                 type: string
 *                 description: CVV of the card
 *             example:
 *               cardName: John Doe
 *               cardNumber: 1234567890123456
 *               month: 12
 *               year: 2023
 *               cvv: 123
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Payment success message
 *               example:
 *                 message: Payment successful
 *       400:
 *         description: Invalid card details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: Invalid card details
 *       500:
 *         description: Payment processing failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: Payment processing failed
 */

router.post("/", authenticateMW, paymentHandler)


module.exports = router