// мидлвер автроризации для импорта в /routes/index.js

// импорты
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    res.send('в заголовках нет autorization'); // добавить обработку ошибки
  } else {
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      res.send(err); // добавить обработку ошибки
    }

    req.user = payload;

    next();
  }
};

module.exports = auth;
