
// controllers/AuthController.js
const { validationResult } = require('express-validator');
const { registerValidation } = require('../middlewares/validators'); // Update the path

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const {secretKey} = require("../config");

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, phone, status, type,  email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            phone,
            status,
            type,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.getError });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const access_token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '5h' });
        let user_id = user.id;
        await Token.create({ access_token, user_id });

        return res.json({ access_token });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
