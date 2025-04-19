const { Op } = require("sequelize");
const RoutesModel = require("../../models/routesModel.js");
const TripsModel = require("../../models/tripsModel.js");
const BusesModel = require("../../models/busesModel.js");
const BusTypesModel = require("../../models/busTypesModel.js");
const SeatsModel = require("../../models/seatsModel.js");
const { add } = require('date-fns');
const BookingModel = require("../../models/bookingModel.js");
const BookingDetailModel = require("../../models/bookingDetailModel.js");
const sendBookingMail = require("../../mail/booking/sendMail.js");
class timeTableController {

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
                .map(route => {
                    const seatsTrip = (route.trips || []).filter(trip => trip.dataValues.totalSeats > 0);
                    return {
                        routeId: route.id,
                        time: route.time,
                        startPoint: route.startPoint,
                        endPoint: route.endPoint,
                        trips: seatsTrip.map(trip => ({
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
                    };
                })
                .filter(route => route.trips.length > 0);
            console.log("getAll timeTable ==>", formattedData);
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


    static async getById(req, res) {
        const { id } = req.params;
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
                            }, {
                                model: SeatsModel,
                                as: "seats",

                            }
                        ]
                    }
                ]
            };
            const routes = await RoutesModel.findByPk(id, {
                include: [tripInclude],
                order: [[{
                    model: TripsModel,
                    as: "trips"
                }, "departureTime", "ASC"]]
            });

            res.status(200).json({
                status: 200,
                success: true,
                message: "Lay du lieu theo id thanh cong",
                data: routes
            })
        } catch (err) {

        }


    }

 static async booking(req, res) {
    try {
        const {
            fullName,
            email,
            phone,
            startPoint,
            endPoint,
            totalSeat,
            finalPrice,
            startDate,
            userId,
            price,
            selectedSeats,
        } = req.body;

        // Kiểm tra seatId 
        const seatIds = selectedSeats.map(seat => seat.id);
        const validSeats = await SeatsModel.findAll({
            where: { id: seatIds }
        });

        if (validSeats.length !== seatIds.length) {
            return res.status(400).json({
                success: false,
                message: "Một hoặc nhiều ghế không hợp lệ!"
            });
        }

        const booking = await BookingModel.create({
            fullName,
            email,
            phone,
            startPoint,
            endPoint,
            totalSeat,
            finalPrice,
            startDate,
            userId,
            status: "pending",
        });

        const bookingDetails = selectedSeats.map(seat => ({
            bookingId: booking.id,
            seatNumber: seat.seatNumber, 
            seatId: seat.id,
            price,
        }));

        await BookingDetailModel.bulkCreate(bookingDetails);

        await SeatsModel.update(
            { status: 'sold' },
            { where: { id: seatIds } }
        );

        const seatsString = selectedSeats.map(seat => seat.seatNumber).join(', ');
        
        await sendBookingMail(
            email,
            fullName,
            booking.id, 
            startPoint,
            endPoint,
            startDate,
            seatsString,
            finalPrice
          );
        return res.status(200).json({
            success: true,
            message: "Đặt vé xe thành công",
            booking,
        });

    } catch (error) {
        console.error("Lỗi đặt vé:", error);
        return res.status(500).json({
            success: false,
            message: 'Đặt vé thất bại!',
            error
        });
    }
}


}

module.exports = timeTableController;
