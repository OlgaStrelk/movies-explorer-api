const router = require('express').Router();

const { updateProfile, getProfile } = require('../controllers/users');
const { profileValidator } = require('../middlewares/validator');

router.get('/me', getProfile);

router.patch('/me', profileValidator, updateProfile);

module.exports = router;
