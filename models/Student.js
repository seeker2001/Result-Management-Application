const { DataTypes } = require('sequelize');  // For setting datatypes to different columns 
const sequelize = require('../utils/database');

const student = sequelize.define(
    'Student',
    {
        id : {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        roll_no: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dob:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {tableName: 'students'}
);

module.exports = student;