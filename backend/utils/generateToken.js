const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d"})

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

module.exports = generateTokenAndSetCookie;