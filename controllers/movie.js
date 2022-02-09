/* eslint-disable no-unused-vars */
// импорты
const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((filmCards) => {
      res.status(200).send(filmCards);
    })
    .catch((err) => {
      res.send(err.message); // обработать ошибку
    });
  // .catch(next);?
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        res.send('фильм по _id из параметров не найден'); // добавить обработку ошибки
      }
      if (movie.owner.toString() !== req.user._id) {
        res.send('Вы не можете удалить чужой фильм'); // добавить обработку ошибки
      } else {
        Movie.findByIdAndDelete(req.params._id)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          });
        // .catch(next); возможно нужно будет прокинуть ошибку дальше
      }
    });
  // .catch(next);?
};

const createMovie = (req, res, next) => {
  Movie.create({
    owner: req.user._id,
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
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      res.send(err);
      // обработать ошибку
    });
  // .catch(next);?
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
