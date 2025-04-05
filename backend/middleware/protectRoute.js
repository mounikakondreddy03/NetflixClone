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

        // const user = await User.findById(decoded.userId).select("-password")
        // if (!user) 
        //     return res.status(404).json({success: false, message: "User not found"})

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(401).json({ success: false, message: 'unauthorized'})
        // res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

module.exports = protectRoute