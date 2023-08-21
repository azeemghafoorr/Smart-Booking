// models/HotelAvailability.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const RoomAvailability = sequelize.define('Room_Availability', {
    from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = RoomAvailability;
