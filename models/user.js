// схема юзера для импорта в controllers/user.js

// импорты
const mongoose = require('mongoose');

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
})

module.exports = mongoose.model('user', userSchema);
