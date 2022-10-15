const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { LOGIN_ERR_MESSAGE, INVALID_EMAIL_ERR_MESSAGE } = require('../utils/consts');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: INVALID_EMAIL_ERR_MESSAGE,
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      required: true,
    },

  },
  { versionKey: false, new: true, runValidators: true },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(LOGIN_ERR_MESSAGE),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(LOGIN_ERR_MESSAGE),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
