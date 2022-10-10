const router = require('express').Router();

const NotFoundError = require('../utils/errors/NotFoundError');
const { NOT_FOUND_PAGE_ERR_MESSAGE } = require('../utils/consts');

router.post('/signup', userValidator, createUser);

router.post('/signin', userValidator, login);

router.use('/movies', require('./movies'));

router.use('/users', require('./users'));

router.use((_, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERR_MESSAGE));
});

module.exports = router;
