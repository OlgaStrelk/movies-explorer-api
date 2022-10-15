const router = require('express').Router();

const { createUser, login } = require('../controllers/auth');
const isAuthorized = require('../middlewares/isAuthorized');

const NotFoundError = require('../utils/errors/NotFoundError');
const { NOT_FOUND_PAGE_ERR_MESSAGE } = require('../utils/consts');

const { userCreateValidator, userLoginValidator } = require('../middlewares/validator');

router.post('/signup', userCreateValidator, createUser);

router.post('/signin', userLoginValidator, login);

router.use(isAuthorized);

router.use('/movies', require('./movies'));

router.use('/users', require('./users'));

router.use((_, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE_ERR_MESSAGE));
});

module.exports = router;
