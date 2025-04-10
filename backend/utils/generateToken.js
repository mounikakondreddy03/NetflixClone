const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d"})

    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production" || true,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: '/'
    })

    return token
}

module.exports = generateTokenAndSetCookie;


// const jwt = require("jsonwebtoken");

// const generateTokenAndSetCookie = (userId, res) => {
// 	const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// 	res.cookie("jwt-netflix", token, {
// 		httpOnly: true, 
// 		secure: true, 
// 		sameSite: "None", 
// 		maxAge: 7 * 24 * 60 * 60 * 1000,
// 	});

// 	return token;
// };

// module.exports = generateTokenAndSetCookie;
