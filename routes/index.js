// Все роуты подключены в файле index.js а он в app.js

// импорты
const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const {
  loginUser,
  createUser,
} = require('../controllers/user');
const {
  validateCreateUser,
  validateLoginUser,
} = require('../utils/joiValidationPresets');
const {
  unknownPath,
} = require('../utils/constants');
// роутер для контроллера который проверяет переданные в теле {почту и пароль} и возвращает JWT
router.post('/signin', validateLoginUser, loginUser);

// роутер для контроллера который создаёт пользователя с переданными в теле {email, password и name}
router.post('/signup', validateCreateUser, createUser);

// все роуты с юзерами
router.use(auth, userRouter);
// все роуты с фильмами
router.use(auth, movieRouter);

// обработка обращения к несуществующему роуту
router.use('/*', () => {
  throw new NotFoundError(unknownPath);
});

module.exports = router;
