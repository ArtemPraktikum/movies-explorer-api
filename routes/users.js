// Все роуты для /users импорт. в routes/index.js

const userRouter = require('express').Router();

// роутер для контроллера который возвращает информацию о пользователе (email и имя)
userRouter.get('/users/me', () => { console.log('test1')});
// роутер для контроллера который обновляет информацию о пользователе (email и имя)
userRouter.patch('/users/me', () => { console.log('test2')});

module.exports = userRouter;
