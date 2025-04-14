const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"]

        if(!token)
            return res.status(401).json({success: false, message: "Unaauthorized no token provided"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) 
            return res.status(401).json({success: false, message: "Invalid token"})
        
        req.user = await User.findById(decoded.userId); 
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(401).json({ success: false, message: 'unauthorized'})
    }
}

module.exports = protectRoute