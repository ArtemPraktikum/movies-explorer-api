// Все роуты для /users импорт. в routes/index.js

// импорты
const userRouter = require('express').Router();
const {
  patchCurrentUser,
  getCurrentUser,
} = require('../controllers/user');

// роутер для контроллера который возвращает информацию о пользователе (email и имя)
userRouter.get('/users/me', getCurrentUser); // добавить проверку данных от пользователя
// роутер для контроллера который обновляет информацию о пользователе (email и имя)
userRouter.patch('/users/me', patchCurrentUser); // добавить проверку данных от пользователя

module.exports = userRouter;
