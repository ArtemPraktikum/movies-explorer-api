// импорты
require('dotenv').config();
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit');


// настройка лимитера
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100 // можно совершить максимум 100 запросов с одного IP
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
//функциональность точки входа
const app = express();


// подключение к бд
mongoose.connect('mongodb://localhost:27017/moviesdb').then(() => {
  // Если бд работает, консоль подтвердит
  console.log('Connected to the Database. Yayzow!');
})

// подключить middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
// единый роутер для всего
app.use('/', router);





app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})
