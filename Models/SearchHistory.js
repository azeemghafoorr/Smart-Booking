// models/SearchHistory.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database configuration

const SearchHistory = sequelize.define('Search_History', {
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_booked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    search_query: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = SearchHistory;
