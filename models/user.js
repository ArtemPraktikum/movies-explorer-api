/* eslint-disable no-console */
// схема юзера для импорта в controllers/user.js

// импорты
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        console.log('дописать обработку ошибки, юзер не найден');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log('дописать обработку ошибки, пароль не совпадает');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
