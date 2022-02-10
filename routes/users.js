// Все роуты для /users импорт. в routes/index.js

// импорты
const userRouter = require('express').Router();
const {
  patchCurrentUser,
  getCurrentUser,
} = require('../controllers/user');
const {
  validatePatchCurrentUser,
} = require('../utils/joiValidationPresets');

// роутер для контроллера который возвращает информацию о пользователе (email и имя)
userRouter.get('/users/me', getCurrentUser); // валидация не нужна

// роутер для контроллера который обновляет информацию о пользователе (email и имя)
userRouter.patch('/users/me', validatePatchCurrentUser, patchCurrentUser);

module.exports = userRouter;
