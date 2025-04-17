const { Op } = require("sequelize");
const RoutesModel = require("../../models/routesModel.js");
const TripsModel = require("../../models/tripsModel.js");
const BusesModel = require("../../models/busesModel.js");
const BusTypesModel = require("../../models/busTypesModel.js");
const SeatsModel = require("../../models/seatsModel.js");
const { add } = require('date-fns');

class HomeController {
    static async filterBuses(req, res) {
        try {
            const { startPoint, endPoint, travelTime } = req.body;

            const whereClause = {};
            if (startPoint) {
                whereClause.startPoint = { [Op.like]: `%${startPoint}%` };
            }
            if (endPoint) {
                whereClause.endPoint = { [Op.like]: `%${endPoint}%` };
            }

            const tripInclude = {
                model: TripsModel,
                as: "trips",
                include: [
                    {
                        model: BusesModel,
                        as: "buses",
                        where: { status: "active" },
                        include: [
                            {
                                model: BusTypesModel,
                                as: "busType",
                                attributes: ['typeName']
                            }
                        ]
                    }
                ]
            };

            if (travelTime) {
                const departureDate = new Date(travelTime);
                tripInclude.where = {
                    departureTime: {
                        [Op.gte]: departureDate.toISOString()
                    }
                };
            }

            const routes = await RoutesModel.findAll({
                where: whereClause,
                include: [tripInclude],
                order: [
                    [{ model: TripsModel, as: "trips" }, "departureTime", "ASC"]
                ]
            });

            // Đếm số ghế trống mỗi chuyến xe
            for (const route of routes) {
                for (const trip of route.trips) {
                    const emptySeatsCount = await SeatsModel.count({
                        where: {
                            busID: trip.buses.id,
                            status: 'empty'
                        }
                    });
                    trip.dataValues.totalSeats = emptySeatsCount;

                    const time = String(route.time);
                    const [hours, minutes] = time.split('.').map(Number);
                    // Tính thời gian đến
                    const arrivalTime = add(new Date(trip.departureTime), {
                        hours: hours || 0,
                        minutes: minutes || 0
                    });
                    trip.dataValues.arrivalTime = arrivalTime;
                }
            }
        
            const formattedData = routes.map(route => {
                return {
                    routeId: route.id,
                    time: route.time,
                    startPoint: route.startPoint,
                    endPoint: route.endPoint,
                    trips: route.trips.map(trip => {
                        return {
                            tripId: trip.id,
                            departureTime: trip.departureTime,
                            price: new Intl.NumberFormat('vi-VN').format(trip.price),
                            arrivalTime: trip.dataValues.arrivalTime, 
                            bus: {
                                busId: trip.buses.id,
                                licensePlate: trip.buses.plateNumber,
                                totalSeats: trip.dataValues.totalSeats,
                                driver: trip.buses.driver,
                                busType: trip.buses.busType.typeName
                            }
                        }
                    })
                }
            });

            return res.json({
                success: true,
                data: formattedData,
                meta: {
                    total: routes.length,
                    filteredBy: { startPoint, endPoint, travelTime  }
                }
            });

        } catch (error) {
            console.error(" Lỗi khi lọc danh sách xe:", error);
            return res.status(500).json({
                success: false,
                message: "Đã xảy ra lỗi server",
                error: error.message
            });
        }
    }


    static async timeTable(req, res) {
        try {
            const tripInclude = {
                model: TripsModel,
                as: "trips",
                include: [
                    {
                        model: BusesModel,
                        as: "buses",
                        include: [
                            {
                                model: BusTypesModel,
                                as: "busType",
                                attributes: ['typeName']
                            }
                        ]
                    }
                ]
            };
    
            const routes = await RoutesModel.findAll({
                include: [tripInclude],
                order: [[{ model: TripsModel, as: "trips" }, "departureTime", "ASC"]]
            });
    
            for (const route of routes) {
                for (const trip of route.trips) {
                    // Lấy ghế trống theo bus ID
                    const emptySeatsCount = await SeatsModel.count({
                        where: {
                            busID: trip.buses.id,
                            status: 'empty'
                        }
                    });
                    trip.dataValues.totalSeats = emptySeatsCount;
    
                    // Tính arrivalTime 
                    const [hours, minutes] = String(route.time).split('.').map(Number);
                    const arrivalTime = add(new Date(trip.departureTime), {
                        hours: hours || 0,
                        minutes: minutes || 0
                    });
                    trip.dataValues.arrivalTime = arrivalTime;
                }
            }
    
            const formattedData = routes
                .map(route => ({
                    routeId: route.id,
                    time: route.time,
                    startPoint: route.startPoint,
                    endPoint: route.endPoint,
                    trips: (route.trips || []).map(trip => ({
                        tripId: trip.id,
                        departureTime: trip.departureTime,
                        price: new Intl.NumberFormat('vi-VN').format(trip.price),
                        arrivalTime: trip.dataValues.arrivalTime,
                        bus: {
                            busId: trip.buses.id,
                            licensePlate: trip.buses.plateNumber,
                            totalSeats: trip.dataValues.totalSeats,
                            driver: trip.buses.driver,
                            busType: trip.buses.busType.typeName
                        }
                    }))
                }))
                .filter(route => route.trips && route.trips.length > 0); // Lọc ra route có trip thật
    
            return res.json({
                success: true,
                data: formattedData,
                meta: {
                    total: formattedData.length
                }
            });
    
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            return res.status(500).json({
                success: false,
                message: "Đã xảy ra lỗi server",
                error: error.message
            });
        }
    }
    
    
}

module.exports = HomeController;
