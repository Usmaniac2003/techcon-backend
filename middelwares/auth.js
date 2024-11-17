const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    const tokenValue = token.split(" ")[1]; 

    if (!tokenValue) {
        res.status(401).json({ message: "Authentication failed , Token missing" });
    }
    try {
        const decode = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY)
        req.user = decode?._id; 
        next();
    } catch (err) {
        res.status(500).json({ message: 'Authentication failed. Invalid token.' })
    }
}

module.exports = auth