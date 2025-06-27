const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);
router.get('/discover', movieController.discoverMovies);
router.get('/search', movieController.searchMovies);
router.get('/:id', movieController.getMovieById);

module.exports = router;
