/* eslint-disable no-console */
// импорты
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralErrorHandler = require('./middlewares/centralErrorHandler');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
// функциональность точки входа
const app = express();

app.use(cors());

// подключение к бд
mongoose.connect('mongodb://localhost:27017/moviesdb').then(() => {
  // Если бд работает, консоль подтвердит
  console.log('Connected to the Database. Yayzow!');
});

// подключить middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimiter);

// логер запросов
app.use(requestLogger);

// единый роутер для всего
app.use('/', router);

// логер ошибок
app.use(errorLogger);
// joi обработчик ошибок
app.use(errors());
// централизованный обработчик ошибки
app.use(centralErrorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
