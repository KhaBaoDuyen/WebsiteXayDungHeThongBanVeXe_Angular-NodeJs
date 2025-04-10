const { RoutesModel, BusesModel, DriverModel, TripsModel, SeatsModel } = require('../../models/connectModel');

class TripsController {
    static async get(req, res) {
        try {
            const trips = await TripsModel.findAll({
                include: [
                    {
                        model: RoutesModel,
                        as: 'routes',
                    },
                    {
                        model: BusesModel,
                        as: 'buses',
                    },
                    {
                        model: DriverModel,
                        as: 'drivers',
                    }
                ]
            })
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công!",
                "data": trips
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const trips = await TripsModel.findOne({
                where: { id },
                include: [
                    {
                        model: RoutesModel,
                        as: 'routes',
                    },
                    {
                        model: BusesModel,
                        as: 'buses',
                        include: {
                            model: SeatsModel,
                            as: 'seats',
                        }
                    },
                    {
                        model: DriverModel,
                        as: 'drivers',
                    }
                ]
            })
            if (!trips) {
                res.status(404).json({ message: 'Không tìm thấy chuyến xe!' });
            }
            res.status(200).json({
                "status": 200,
                "message": "Lấy chuyến xe thành công!",
                "data": trips
            })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const {
                busID,
                routeId,
                driverId,
                departureTime,
                arrivalTime,
                price,
                status,
            } = req.body;

            const trips = await TripsModel.create({
                busID,
                routeId,
                driverId,
                departureTime,
                arrivalTime,
                price,
                status,
            });
            res.status(200).json({
                "status": 200,
                "message": "Thêm chuyến xe thành công!",
                "data": trips
            })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const {
                busID,
                routeId,
                driverId,
                departureTime,
                arrivalTime,
                price,
                status,
            } = req.body;

            const trips = await TripsModel.findOne({
                where: { id }
            })

            trips.busID = busID;
            trips.routeId = routeId;
            trips.driverId = driverId;
            trips.departureTime = departureTime;
            trips.arrivalTime = arrivalTime;
            trips.price = price;
            trips.status = status;

            await trips.save();

            res.status(200).json({
                "status": 200,
                "message": "Cập nhật thành công!",
                "data": trips
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res){
        try{
            const {id} =req.params;
            const trips = await TripsModel.findOne({ where: {id} });
            await trips.destroy();

            res.status(200).json({
                "status": 200,
                "message": "Xóa thành công!",
                "data": trips
            });
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
}
module.exports = TripsController;