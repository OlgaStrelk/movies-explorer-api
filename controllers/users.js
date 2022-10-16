const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const {
  USER_ID_ERR_MESSAGE, USER_DATA_ERR_MESSAGE, EMAIL_CONFLICT_ERR_MESSAGE, DUPLICATED_DATA_ERROR,
} = require('../utils/consts');
const BadRequestError = require('../utils/errors/BadRequestError');
const ConflictError = require('../utils/errors/ConflictError');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_ID_ERR_MESSAGE));
      } else {
        res.send({
          data: user,
        });
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(USER_ID_ERR_MESSAGE));
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(USER_DATA_ERR_MESSAGE));
      } if (err.code === DUPLICATED_DATA_ERROR) {
        return next(new ConflictError(EMAIL_CONFLICT_ERR_MESSAGE));
      } return next(err);
    });
};
