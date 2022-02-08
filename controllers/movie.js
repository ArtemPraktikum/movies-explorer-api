// импорты
const Movie = require('../models/movie.js');

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
    nameEN: req.body.nameEN
  })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      res.send(err);
      // обработать ошибку
    })
    // .catch(next);?
};

module.exports = {
  // getMovies,
  createMovie,
  // deleteMovie,
};
