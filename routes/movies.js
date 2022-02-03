const movieRouter = require('express').Router();

// роутер для контроллера который возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/movies', () => { console.log('test3')});
// роутер для контроллера который создаёт фильм с переданными в теле {country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId}
movieRouter.post('/movies', () => { console.log('test4')});
// роутер для контроллера который удаляет сохранённый фильм по !id!
movieRouter.delete('/movies/:_id',  () => { console.log('test5')});
module.exports = movieRouter;
