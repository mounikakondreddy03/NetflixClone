const express = require('express');
const { getTrendingTv, getTvTrailers, getSimilarTvs, getTvDetails, getTvByCategory } = require('../controllers/tvControllers');

const router = express.Router();

router.get('/trending', getTrendingTv)
router.get('/:id/trailers', getTvTrailers)
router.get('/:id/details', getTvDetails)
router.get('/:id/similar', getSimilarTvs)
router.get('/:category', getTvByCategory)

module.exports = router