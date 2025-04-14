const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvControllers');

router.get('/', (req, res) => {
    const tvData = require('../controllers/tvControllers').tvData;
    console.log('TV data:', tvData.length);
    res.status(200).json({ success: true, content: tvData});
});

router.get('/trending', tvController.getTrendingTv);

router.get('/:id/trailers', tvController.getTvTrailers);

router.get('/:id/similar', tvController.getSimilarTvs);

router.get('/:id', tvController.getTvDetails);

module.exports = router;