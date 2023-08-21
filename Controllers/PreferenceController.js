// controllers/PreferenceController.js
const { validationResult } = require('express-validator');
const Preference = require('../models/Preference');

exports.createPreference = async (req, res) => {
    try {
        const { level, reward, user_id, type } = req.body;
        const preference = await Preference.create({
            level,
            reward,
            user_id,
            type,
        });
        return res.status(201).json(preference);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPreferences = async (req, res) => {
    try {
        const preferences = await Preference.findAll();
        return res.json(preferences);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPreferenceById = async (req, res) => {
    try {
        const { id } = req.params;
        const preference = await Preference.findByPk(id);
        if (!preference) {
            return res.status(404).json({ message: 'Preference not found' });
        }
        return res.json(preference);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updatePreference = async (req, res) => {
    try {
        const { id } = req.params;
        const { level, reward, user_id, type } = req.body;
        const preference = await Preference.findByPk(id);
        if (!preference) {
            return res.status(404).json({ message: 'Preference not found' });
        }
        preference.level = level;
        preference.reward = reward;
        preference.user_id = user_id;
        preference.type = type;
        await preference.save();
        return res.json(preference);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePreference = async (req, res) => {
    try {
        const { id } = req.params;
        const preference = await Preference.findByPk(id);
        if (!preference) {
            return res.status(404).json({ message: 'Preference not found' });
        }
        await preference.destroy();
        return res.json({ message: 'Preference deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
