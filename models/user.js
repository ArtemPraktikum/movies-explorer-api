/* eslint-disable no-console */
// схема юзера для импорта в controllers/user.js

// импорты
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  emailNotFound,
  wrongPassword,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // дописать валидацию
  },
  password: {
    type: String,
    required: true,
    select: false,
    // дописать валидацию
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    // дописать валидацию?
  },
});

// добавить метод findUserByCredentials схеме пользователя для облегчения кода в loginUser
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(emailNotFound));
      }

      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return Promise.reject(new UnauthorizedError(wrongPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
