// routes/users.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { check } = require('express-validator');
const PasswordResetController = require('../controllers/PasswordResetController');

router.post('/send-verification-email', UserController.sendVerificationEmail);
router.get('/verify/:token', UserController.verifyEmail);
router.get('/:id', UserController.getUserById);
router.post(
    '/send-reset-password-email',
    [check('email').isEmail().withMessage('Invalid email')],
    PasswordResetController.sendResetPasswordEmail
);

router.post(
    '/reset-password',
    [
        check('token').notEmpty().withMessage('Token is required'),
        check('newPassword')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    PasswordResetController.resetPassword
);

module.exports = router;
