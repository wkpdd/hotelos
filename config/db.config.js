// dbConfig.js
const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

module.exports = sequelize;
