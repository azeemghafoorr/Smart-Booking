// models/Preference.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const Preference = sequelize.define('Preference', {
    level: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reward: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Preference;
