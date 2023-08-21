// models/Booking.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const Booking = sequelize.define('Booking', {
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    no_of_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_of_arrival: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    departure_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_of_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Booking;
