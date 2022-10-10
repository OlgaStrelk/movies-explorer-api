const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { movieValidator, movieIdValidator } = require('../middlewares/validator');

router.get('/', getMovies);

router.post('/', movieValidator, createMovie);

router.delete('/:movieId', movieIdValidator, deleteMovieById);

module.exports = router;
