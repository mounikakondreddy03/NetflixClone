const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieControllers');

router.get('/', (req, res) => {
    const movieData = require('../controllers/movieControllers').movieData;
    console.log('Movie data:', movieData.length);
    res.status(200).json({ success: true, content: movieData });
});

router.get('/trending', movieController.getTrendingMovie);

router.get('/:id/trailers', movieController.getMovieTrailers);

router.get('/:id/similar', movieController.getSimilarMovies);

router.get('/:id', movieController.getMovieDetails);

module.exports = router;
