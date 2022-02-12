const rateLimit = require('express-rate-limit');

// настройка лимитера
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = rateLimiter;
