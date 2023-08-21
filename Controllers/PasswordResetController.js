// controllers/PasswordResetController.js
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

exports.sendResetPasswordEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
         // Token valid for 1 hour
        user.expires_at = new Date(Date.now() + 360000000);
        user.forgot_password_token = token;
        await user.save();
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
        const mailOptions = {
            from: 'your-email@example.com',
            to: email,
            subject: 'Reset Password',
            text: `Click the following link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Error sending email' });
            }
            return res.json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, new_password } = req.body;

        const user = await User.findOne({ where: {forgot_password_token: token } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.expires_at < new Date()) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }


        user.password = await bcrypt.hash(new_password, 10);
        user.forgot_password_token = null;
        await user.save();

        return res.json({ message: 'Password reset successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
