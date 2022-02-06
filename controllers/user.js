// контроллеры для импорта в /routes
const { NODE_ENV, JWT_SECRET } = process.env;

// импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');



const loginUser = (req, res, next) => {
  return User
    .findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      // обработать ошибку
      console.log(err);
    })
    // .catch(next);?
};

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
  loginUser,
  createUser
};

