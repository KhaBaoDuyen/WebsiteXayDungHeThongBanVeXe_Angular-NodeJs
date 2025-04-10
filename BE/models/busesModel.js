const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const BusesModel = connection.define('Buses',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plateNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    busTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: true,
    },
    totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    seatsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'buses',
    timestamps: false,
});
module.exports = BusesModel;
