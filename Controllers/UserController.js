// controllers/UserController.js
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ where: { verificationToken: token } });
        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }

        user.is_verified = true;
        user.verificationToken = null;
        await user.save();

        return res.json({ message: 'Email verified successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a random verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        user.verificationToken = verificationToken;
        await user.save();

        const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        const mailOptions = {
            from: 'azeem@example.com',
            to: email,
            subject: 'Email Verification',
            text: `Click the following link to verify your email: ${verificationLink}`,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({error: 'Error sending email'});
            }
            return res.json({message: 'Verification email sent'});
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
