function paramIsValidId(req, res, next) {
    const id = req.params.id;
  
    // Check if the ID is valid
    if (Number.isInteger(parseInt(id))) {
      return next();
    }
  
    res.status(406).json({
      msg: `Invalid param value ${id}`,
    });
}
  
module.exports = paramIsValidId
  