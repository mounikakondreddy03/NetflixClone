const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d"})

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: '/'
    })

    return token
}

module.exports = generateTokenAndSetCookie;