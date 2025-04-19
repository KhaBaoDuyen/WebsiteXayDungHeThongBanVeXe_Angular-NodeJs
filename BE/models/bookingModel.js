const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const BookingModel = connection.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    startPoint: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endPoint: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    finalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalSeat: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bookings',
    timestamps: false 
});

module.exports = BookingModel;
