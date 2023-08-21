// routes/auth.js
const express = require('express');
const router = express.Router();
const { registerValidation } = require('../middlewares/validators');
const { loginValidation } = require('../middlewares/validators');
const AuthController = require('../controllers/AuthController');


router.post('/register',registerValidation, AuthController.register);
router.post('/login', loginValidation, AuthController.login);
module.exports = router;
