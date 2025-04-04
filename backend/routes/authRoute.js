const express = require('express');
const { signup, login, logout, authCheck } = require('../controllers/authControllers');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.post('/logout',logout)

router.get('/authCheck', protectRoute, authCheck)
module.exports = router;