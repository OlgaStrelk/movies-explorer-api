const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');
const {
  CONFLICT_ERR_MESSAGE,
  USER_DATA_ERR_MESSAGE,
} = require('../utils/consts');

const DUPLICATED_DATA_ERROR = 11000;
const SAULT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, SAULT_ROUNDS)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.code === DUPLICATED_DATA_ERROR) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(USER_DATA_ERR_MESSAGE));
      } else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};
