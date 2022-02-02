// Все роуты подключены в файле index.js а он в app.js

const router = require('express').Router();




const userRouter = require('./users.js');
// const movieRouter = require('./movies.js');

// все роуты с юзерами
router.use(userRouter);
// все роуты с фильмами
// router.use(movieRouter);

module.exports = router;