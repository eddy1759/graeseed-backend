const jwt = require("jsonwebtoken")
const CONFIG = require("../config/config")


const authenticateMW = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Authentication token not found" });
    }

    jwt.verify(token, CONFIG.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user.username;
        next();
    })
}

module.exports =  authenticateMW