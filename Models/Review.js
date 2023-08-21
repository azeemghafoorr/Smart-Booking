// models/Review.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Review;
