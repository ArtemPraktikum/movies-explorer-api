// импорты
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
//функциональность точки входа
const app = express();


// подключение к бд
mongoose.connect('mongodb://localhost:27017/moviesdb').then(() => {
  // Если бд работает, консоль подтвердит
  console.log('Connected to the Database. Yayzow!');
})

// подключить bobyParser как middleware
app.use(bodyParser.json());
// единый роутер для всего
app.use('/', router);





app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})
