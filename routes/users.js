const router = require('express').Router();

const { updateProfile, getProfile } = require('../controllers/users');

router.get('/me', userIdValidator, getProfile);

router.patch('/me', profileValidator, updateProfile);

module.exports = router;
