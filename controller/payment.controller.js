const { validateCardDetails } = require("../utils/helper")

const paymentHandler =  (req, res) => {
    try {
        const { cardName, cardNumber, month, year, cvv } = req.body;
  
        // Validate the card details
        const validation = validateCardDetails(cardName, cardNumber, month, year, cvv);
        if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
        }
    
        const paymentProcessed = true;
    
        if (paymentProcessed) {
        res.json({ message: "Payment successful" });
        } else {
        res.status(500).json({ error: "Payment processing failed" });
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = paymentHandler