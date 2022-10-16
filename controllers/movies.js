const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const {
  MOVIE_DATA_ERR_MESSAGE,
  MOVIE_ID_ERR_MESSAGE,
  DELETE_MOVIE_ERR_MESSAGE,
  DELETE_MOVIE_SUCCESS_MESSAGE,
} = require('../utils/consts');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_ID_ERR_MESSAGE))
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        return movie.remove()
          .then((removedMovie) => {
            res.send({ message: `${DELETE_MOVIE_SUCCESS_MESSAGE} ${removedMovie.nameRU}` });
          });
      }
      return next(new ForbiddenError(DELETE_MOVIE_ERR_MESSAGE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MOVIE_DATA_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (_, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};
