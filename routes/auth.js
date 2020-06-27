const express = require('express');
const { signup, signin } = require('../controllers/auth');
const { signupValidator } = require('../Validators/Validator');
const router = express.Router();
router.post('/signup/manager', signupValidator, signup);
router.post('/signin/manager', signin);

module.exports = router;
