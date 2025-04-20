const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const TripsModel = connection.define('Trips',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    busID: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    routeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    departureTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'canceled','running'),
        allowNull: true,
    },
}, {
    tableName: 'trips',
    timestamps: false,
});
module.exports = TripsModel;
