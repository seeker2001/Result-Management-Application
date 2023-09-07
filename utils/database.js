const { Sequelize } = require('sequelize'); // Get the Sequelize class from sequelize package
const dotenv = require('dotenv');
dotenv.config({path : 'config.env'});

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASS;

// create an instance of the Sequelize class
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASS, {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
