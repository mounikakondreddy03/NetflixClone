const express = require('express');
const { getTrendingMovie } = require('../controllers/movieControllers');

const router = express.Router();

router.get('/trending', getTrendingMovie)

module.exports = router;