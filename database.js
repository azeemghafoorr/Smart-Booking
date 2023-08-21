const Sequelize = require('sequelize');

const sequelize = new Sequelize('smart_booking', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
