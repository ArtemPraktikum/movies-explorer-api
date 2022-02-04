// схема фильма для импорта в controllers/movie.js

// импорты
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    // дописать валидацию
  },
  director: {
    type: String,
    required: true,
    // дописать валидацию
  },
  duration: {
    type: Number,
    required: true,
    // дописать валидацию
  },
  year: {
    type: String,
    required: true,
    // дописать валидацию
  },
  description: {
    type: String,
    required: true,
    // дописать валидацию
  },
  image: {
    type: String,
    required: true,
    // дописать валидацию
  },
  trailerLink: {
    type: String,
    required: true,
    // дописать валидацию
  },
  thumbnail: {
    type: String,
    required: true,
    // дописать валидацию
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    // дописать валидацию?
  },
  movieId: {
    type: Number,
    required: true,
    // дописать валидацию
  },
  nameRU: {
    type: String,
    required: true,
    // дописать валидацию
  },
  nameEN: {
    type: String,
    required: true,
    // дописать валидацию
  },
})

module.exports = mongoose.model('movie', movieSchema);
