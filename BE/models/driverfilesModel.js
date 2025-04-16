const connection = require('../config/database');
const { DataTypes } = require('sequelize');
const DriverModel = require('./driverModel');

const DriverFileModel = connection.define('DriverFileModel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'DriverModel', 
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'driverfiles',
  timestamps: false
});

DriverModel.hasMany(DriverFileModel, {
  foreignKey: 'driverId',
  as: 'files' 
});

DriverFileModel.belongsTo(DriverModel, {
  foreignKey: 'driverId',
  as: 'driver'
});

module.exports = DriverFileModel;
