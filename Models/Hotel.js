// models/Hotel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const Hotel = sequelize.define('Hotel', {
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    lat: {
        type: DataTypes.STRING,
    },
    lng: {
        type: DataTypes.STRING,
    },
});

module.exports = Hotel;
