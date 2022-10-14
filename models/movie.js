const mongoose = require('mongoose');
const validator = require('validator');
const { MOVIE_SCHEMA_REQUIRED_MESSAGES } = require('../utils/consts');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.COUNTRY],
    },

    director: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DIRECTOR],
    },

    duration: {
      type: Number,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DURATION],
    },

    year: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.YEAR],
    },

    description: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.DESCRIPTION],
    },

    image: {
      type: String,
      validate: {
        validator(str) {
          return validator.isURL(str);
        },
      },
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.IMAGE],
    },

    trailerLink: {
      type: String,
      validate: {
        validator(str) {
          return validator.isURL(str);
        },
      },
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.TRAILER_LINK],
    },

    thumbnail: {
      type: String,
      validate: {
        validator(str) {
          return validator.isURL(str);
        },
      },
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.THUMBNAIL],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.OWNER],
    },

    nameRU: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_RU],
    },

    nameEN: {
      type: String,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.NAME_EN],
    },

    movieId: {
      type: Number,
      required: [true, MOVIE_SCHEMA_REQUIRED_MESSAGES.MOVIE_ID]
    },
  },
  { versionKey: false, new: true, runValidators: true },
);

module.exports = mongoose.model('movie', movieSchema);
