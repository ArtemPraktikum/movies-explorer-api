/* eslint-disable no-unused-vars */
// контроллеры для импорта в /routes
const { NODE_ENV, JWT_SECRET } = process.env;

// импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      // обработать ошибку
      res.send(err);
    });
  // .catch(next);?
};

const patchCurrentUser = (req, res, next) => {
  User.findOneAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      // обработать ошибку
      res.status(200).send(user);
    })
    .catch((err) => {
      res.send(err); // обработать ошибку
    });
  // .catch(next);?
};

const loginUser = (req, res, next) => User
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
    res.send(err);
  });
// .catch(next);?

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
      res.send(err.message);
      // написать обработчики ошибок
    });
};

module.exports = {
  patchCurrentUser,
  getCurrentUser,
  loginUser,
  createUser,
};
