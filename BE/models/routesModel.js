const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const RoutesModel = connection.define('Routes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    startPoint: {
        type: DataTypes.STRING,
        allowNull: true
    },
    endPoint: {
        type: DataTypes.STRING,
        allowNull: true
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    time: {
        type: DataTypes.TIME,
        allowNull: true
    },
}, {
    tableName: 'routes',
    timestamps: false ,
});

module.exports = RoutesModel;