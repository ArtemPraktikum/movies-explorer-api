// Все роуты для /movies импорт. в routes/index.js

// импорты
const movieRouter = require('express').Router();
const {
  deleteMovie,
  createMovie,
  // getMovies
} = require('../controllers/movie.js');

// роутер для контроллера который возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/movies', () => { console.log('test3')});
// роутер для контроллера который создаёт фильм с переданными в теле {country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId}
movieRouter.post('/movies', createMovie);
// роутер для контроллера который удаляет сохранённый фильм по _id
movieRouter.delete('/movies/:_id', deleteMovie);

module.exports = movieRouter;
