const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvController');

router.get('/', tvController.getAllTVShows);
router.get('/discover', tvController.discoverTVShows);
router.get('/genres', tvController.getTVGenres);
router.get('/:id', tvController.getTVShowById);

module.exports = router;
