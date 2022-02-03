// Все роуты подключены в файле index.js а он в app.js

const router = require('express').Router();

// импорты роутеров
const userRouter = require('./users.js');
const movieRouter = require('./movies.js');

// роутер для контроллера который проверяет переданные в теле {почту и пароль} и возвращает JWT
router.post('/signin', () => { console.log('test6')});
// роутер для контроллера который создаёт пользователя с переданными в теле {email, password и name}
router.post('/signup', () => { console.log('test7')});

// все роуты с юзерами
router.use(userRouter);
// все роуты с фильмами
router.use(movieRouter);

module.exports = router;