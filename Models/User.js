// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'active', 'blocked', 'inactive'),
        allowNull: false,
    },
    remember_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    forgot_password_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('admin', 'user', 'owner'),
        allowNull: false,
    },
    current_lat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    current_lng: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active_lat: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active_lng: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    verificationToken: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
});

module.exports = User;
