// Все роуты подключены в файле index.js, который находится в папке routes
const router = require('express').Router();






// все роуты с юзерами
router.use(userRouter);
// все роуты с фильмами
router.use(movieRouter);

