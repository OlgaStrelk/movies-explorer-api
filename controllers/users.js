const User = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const { USER_ID_ERR_MESSAGE, USER_DATA_ERR_MESSAGE } = require('../utils/consts');
const BadRequestError = require('../utils/errors/BadRequestError');

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
        next(new BadRequestError(USER_DATA_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};
