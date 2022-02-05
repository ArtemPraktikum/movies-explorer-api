// контроллеры для импорта в /routes

// импорты
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
      // написать обработчики ошибок
    })
};

module.exports = {
  createUser
};

