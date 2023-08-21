// models/Notification.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const Notification = sequelize.define('Notification', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    booking_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

module.exports = Notification;
