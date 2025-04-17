const TripsModel = require('./tripsModel');
const BusesModel = require('./busesModel');
const DriverModel = require('./driverModel');
const RoutesModel = require('./routesModel');
const SeatsModel = require('./seatsModel');
const BusTypesModel = require('./busTypesModel');


//--------------------- [ Thiết lập quan hệ ]------------------------

// Route - Trip
RoutesModel.hasMany(TripsModel, { foreignKey: 'routeId', as: 'trips' });
TripsModel.belongsTo(RoutesModel, { foreignKey: 'routeId', as: 'routes' });

// Bus - Trip
BusesModel.hasMany(TripsModel, { foreignKey: 'busID', as: 'trips' });
TripsModel.belongsTo(BusesModel, { foreignKey: 'busID', as: 'buses' });

// Driver - Trip
DriverModel.hasMany(TripsModel, { foreignKey: 'driverId', as: 'trips' });
TripsModel.belongsTo(DriverModel, { foreignKey: 'driverId', as: 'drivers' });


// Bus - Seats
BusesModel.hasMany(SeatsModel, { foreignKey: 'busId', as: 'seats' });
SeatsModel.belongsTo(BusesModel, { foreignKey: 'busId', as: 'bus' });

// Buses - BusType
BusesModel.belongsTo(BusTypesModel, { foreignKey: 'busTypeId', as: 'busType' });
BusTypesModel.hasMany(BusesModel, { foreignKey: 'busTypeId', as: 'buses' });

// Driver - Trips
DriverModel.hasOne(BusesModel, { foreignKey: 'driverId', as: 'bus'});
BusesModel.belongsTo(DriverModel, { foreignKey: 'driverId', as: 'drivers'  });
  

module.exports = {TripsModel, BusesModel, DriverModel, RoutesModel, SeatsModel};
// Driver - Buses
DriverModel.hasOne(BusesModel, { foreignKey: 'driverId', as: 'bus'});
BusesModel.belongsTo(DriverModel, { foreignKey: 'driverId', as: 'drivers'  });

module.exports = { TripsModel, BusesModel, DriverModel, RoutesModel, SeatsModel, BusTypesModel, };
