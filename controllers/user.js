// контроллеры для импорта в /routes

const { NODE_ENV, JWT_SECRET } = process.env;

// импорты
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const {
  emailAlreadyUsed,
  badUserData,
} = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const patchCurrentUser = (req, res, next) => {
  const id = req.user._id;
  const newName = req.body.name;
  const newEmail = req.body.email;
  User.findOneAndUpdate(
    { _id: id },
    { name: newName, email: newEmail },
    { runValidators: true, new: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badUserData);
      }
      if (err.code === 11000) {
        throw new ConflictError(emailAlreadyUsed);
      } else next(err);
    })
    .catch(next);
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
  .catch(next);

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
      if (err.name === 'ValidationError') {
        throw new BadRequestError(badUserData);
      }
      if (err.code === 11000) {
        throw new ConflictError(emailAlreadyUsed);
      } else next(err);
    })
    .catch(next);
};

module.exports = {
  patchCurrentUser,
  getCurrentUser,
  loginUser,
  createUser,
};
