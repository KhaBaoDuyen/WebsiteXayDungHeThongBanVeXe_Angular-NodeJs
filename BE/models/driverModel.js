const connection = require('../config/database');
const { DataTypes } = require('sequelize');

const DriverModel = connection.define('Driver', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  licenseType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  licenseNumber: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  experienceYears: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  YearBirthDate: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'drivers',
  timestamps: false,
});

module.exports = DriverModel;
