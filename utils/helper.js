// Function to validate card details
function validateCardDetails(cardName, cardNumber, month, year, cvv) {
    if (!cardName || !cardNumber || !month || !year || !cvv) {
      return { valid: false, error: "Invalid card details" };
    }
  
    //  check the card number length, CVV length, expiry date, etc.
    if (cardNumber.length !== 16) {
      return { valid: false, error: "Invalid card number" };
    }
  
    if (cvv.length !== 3) {
      return { valid: false, error: "Invalid CVV" };
    }
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { valid: false, error: "Card has expired" };
    }
  
    return { valid: true };
  }


function calculateVAT (price) {
    const vat = price * 0.075
    return vat
}

const deliveryFee = 3000

module.exports = {
    validateCardDetails,
    calculateVAT,
    deliveryFee
}