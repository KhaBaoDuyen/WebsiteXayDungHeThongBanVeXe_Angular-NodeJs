const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const BookingDetailModel = connection.define('BookingDetail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seatId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'bookingdetail',
    timestamps: false
});

module.exports = BookingDetailModel;
