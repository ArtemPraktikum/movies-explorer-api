// мидлвер автроризации для импорта в /routes/index.js

// импорты
const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  wrongAuthHeader,
  wrongToken,
} = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequestError(wrongAuthHeader);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(wrongToken);
  }

  req.user = payload;

  next();
};

module.exports = auth;
