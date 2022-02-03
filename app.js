//функциональность точки входа
const express = require('express');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// импорты
const router = require('./routes/index.js');
const bodyParser = require('body-parser');




// подключить bobyParser как middleware
app.use(bodyParser.json());
// единый роутер для всего
app.use('/', router);





app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})
