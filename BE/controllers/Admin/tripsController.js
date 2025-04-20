const { Sequelize } = require('sequelize');
const { RoutesModel, BusesModel, DriverModel, TripsModel, SeatsModel } = require('../../models/connectModel');

class TripsController {
    static async get(req, res) {
        try {
            const trips = await TripsModel.findAll({
                include: [
                    { model: RoutesModel, as: 'routes' },
                    { model: BusesModel, as: 'buses' },
                    { model: DriverModel, as: 'drivers' }
                ],
                order:[[
                    'id','DESC'
                ]]
            });
            res.status(200).json({ status: 200, message: "Lấy danh sách thành công!", data: trips });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const trip = await TripsModel.findOne({
                where: { id },
                include: [
                    { model: RoutesModel, as: 'routes' },
                    {
                        model: BusesModel,
                        as: 'buses',
                        include: { model: SeatsModel, as: 'seats' }
                    },
                    { model: DriverModel, as: 'drivers' }
                ]
            });

            if (!trip) return res.status(404).json({ message: 'Không tìm thấy chuyến xe!' });

            res.status(200).json({ status: 200, message: "Lấy chuyến xe thành công!", data: trip });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { busID, routeId, driverId, departureTime, price } = req.body;

            const route = await RoutesModel.findOne({ where: { id: routeId } });
            if (!route) return res.status(404).json({ message: "Không tìm thấy tuyến đường!" });

            const currentDateTime = new Date();
            const departureDateTime = new Date(departureTime);
            if (departureDateTime.getTime() <= currentDateTime.getTime() + 2 * 60 * 60 * 1000) {
                return res.status(400).json({ message: "Thời gian khởi hành phải lớn hơn hiện tại ít nhất 2 tiếng!" });
            }

            const durationInMs = route.time * 60 * 60 * 1000;
            const arrivalDateTime = new Date(departureDateTime.getTime() + durationInMs);

            const existingTrips = await TripsModel.findAll({
                where: {
                    [Sequelize.Op.or]: [{ busID }, { driverId }]
                }
            });

            for (const trip of existingTrips) {
                const start = new Date(trip.departureTime);
                const end = new Date(trip.arrivalTime);

                const isOverlap =
                    (departureDateTime >= start && departureDateTime < end) ||
                    (arrivalDateTime > start && arrivalDateTime <= end) ||
                    (departureDateTime <= start && arrivalDateTime >= end);

                if (trip.busID === busID && isOverlap) {
                    return res.status(400).json({ message: "Xe đã được sử dụng trong chuyến khác vào thời gian này!" });
                }

                if (trip.driverId === driverId && isOverlap) {
                    return res.status(400).json({ message: "Tài xế đã được phân công chuyến khác vào thời gian này!" });
                }
            }

            const newTrip = await TripsModel.create({
                busID,
                routeId,
                driverId,
                departureTime: departureDateTime,
                arrivalTime: arrivalDateTime,
                price,
                status: 'scheduled'
            });

            res.status(200).json({ status: 200, message: "Thêm chuyến xe thành công!", data: newTrip });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { busID, routeId, driverId, departureTime, price, status } = req.body;

            const trip = await TripsModel.findOne({ where: { id } });
            if (!trip) return res.status(404).json({ message: "Không tìm thấy chuyến xe!" });

            const currentDateTime = new Date();
            const newDeparture = new Date(departureTime);
            if (newDeparture.getTime() <= currentDateTime.getTime() + 2 * 60 * 60 * 1000) {
                return res.status(400).json({ message: "Thời gian khởi hành phải lớn hơn hiện tại ít nhất 2 tiếng!" });
            }

            const route = await RoutesModel.findOne({ where: { id: routeId } });
            if (!route) return res.status(404).json({ message: "Không tìm thấy tuyến đường!" });

            const newArrival = new Date(newDeparture.getTime() + route.time * 60 * 60 * 1000);

            const existingTrips = await TripsModel.findAll({
                where: {
                    id: { [Sequelize.Op.ne]: id },
                    [Sequelize.Op.or]: [{ busID }, { driverId }]
                }
            });

            for (const tripItem of existingTrips) {
                const start = new Date(tripItem.departureTime);
                const end = new Date(tripItem.arrivalTime);

                const isOverlap =
                    (newDeparture >= start && newDeparture < end) ||
                    (newArrival > start && newArrival <= end) ||
                    (newDeparture <= start && newArrival >= end);

                if (tripItem.busID === busID && isOverlap) {
                    return res.status(400).json({ message: "Xe đã được sử dụng trong chuyến khác vào thời gian này!" });
                }

                if (tripItem.driverId === driverId && isOverlap) {
                    return res.status(400).json({ message: "Tài xế đã được phân công chuyến khác vào thời gian này!" });
                }
            }

            const oldBusID = trip.busID;
            const oldDriverId = trip.driverId;

            trip.busID = busID;
            trip.routeId = routeId;
            trip.driverId = driverId;
            trip.departureTime = newDeparture;
            trip.arrivalTime = newArrival;
            trip.price = price;
            trip.status = status;

            await trip.save();

            if (oldBusID !== busID) {
                const hasOldBusTrip = await TripsModel.findOne({ where: { busID: oldBusID } });
                if (!hasOldBusTrip) {
                    await BusesModel.update({ status: 'inactive' }, { where: { id: oldBusID } });
                }
                await BusesModel.update({ status: 'active' }, { where: { id: busID } });
            }

            if (oldDriverId !== driverId) {
                const hasOldDriverTrip = await TripsModel.findOne({ where: { driverId: oldDriverId } });
                if (!hasOldDriverTrip) {
                    await DriverModel.update({ status: 'inactive' }, { where: { id: oldDriverId } });
                }
                await DriverModel.update({ status: 'active' }, { where: { id: driverId } });
            }

            res.status(200).json({ status: 200, message: "Cập nhật thành công!", data: trip });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const trip = await TripsModel.findOne({ where: { id } });
            if (!trip) return res.status(404).json({ message: "Không tìm thấy chuyến xe!" });

            const { busID, driverId } = trip;
            await trip.destroy();

            const hasBusTrip = await TripsModel.findOne({ where: { busID } });
            if (!hasBusTrip) {
                await BusesModel.update({ status: 'inactive' }, { where: { id: busID } });
            }

            const hasDriverTrip = await TripsModel.findOne({ where: { driverId } });
            if (!hasDriverTrip) {
                await DriverModel.update({ status: 'inactive' }, { where: { id: driverId } });
            }

            res.status(200).json({success:true, status: 200, message: "Xóa thành công!", data: trip });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TripsController;
