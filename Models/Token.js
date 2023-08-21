// models/Token.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Token = sequelize.define('Token', {
    access_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Token;
