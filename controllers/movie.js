// контроллеры для импорта в /routes

// импорты
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  badMovieData,
  movieNotFound,
  cantDeleteMovie,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((filmCards) => {
      res.status(200).send(filmCards);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(cantDeleteMovie);
      } else {
        Movie.findByIdAndDelete(req.params._id)
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({
    owner,
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badMovieData);
      } else next(err);
    })
    .catch(next);
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
