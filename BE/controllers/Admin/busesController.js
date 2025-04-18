/* const BusesModel = require('../../models/busesModel');
const SeatsModel = require('../../models/seatsModel');
const TripsModel = require('../../models/tripsModel'); */

const { RoutesModel, BusesModel, DriverModel, TripsModel, SeatsModel, BusTypesModel, } = require('../../models/connectModel');

const { Op } = require('sequelize');
class BusesController {
    static async get(req, res) {
        try {
            const buses = await BusesModel.findAll({
                include: [
                    {
                        model: BusTypesModel,
                        as: 'busType',
                    },
                    {
                        model: SeatsModel,
                        as: 'seats',
                    },
                    {
                        model: DriverModel,
                        as: 'drivers',
                    }
                ]
            });
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công",
                "data": buses
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const bus = await BusesModel.findByPk(id);

            if (!bus) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "success": true,
                "message": "Lấy loại xe thành công",
                "data": bus
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // //------------------[ CREATE ]------------------
    static async create(req, res) {
        try {
            const {
                plateNumber,
                busTypeId,
                status,
                totalSeats
            } = req.body;

            console.log(req.body);

            const bus = await BusesModel.create({
                plateNumber,
                busTypeId,
                status,
                totalSeats
            });

            if (!bus) {
                return res.status(400).json({ error: "Không thể tạo xe mới" });
            }

            const seatPromises = [];
            for (let i = 1; i <= totalSeats; i++) {
                seatPromises.push(
                    SeatsModel.create({
                        busID: bus.id,
                        seatNumber: `G${i}`,
                        status: 'empty'
                    })
                );
            }

            await Promise.all(seatPromises);

            res.status(201).json({
                success: true,
                message: "Thêm mới loại xe và các ghế thành công",
                bus
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }



    // //------------------[ UPDATE ]------------------
    static async update(req, res) {
        try {
            const { id } = req.params;
    
            let {
                plateNumber,
                busTypeId,
                status,
                totalSeats
            } = req.body;
    
            if (!plateNumber || !busTypeId || !status || !totalSeats) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập đầy đủ thông tin hợp lệ."
                });
            }
    
            const bus = await BusesModel.findByPk(id);
            if (!bus) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }
    
            const oldTotalSeats = bus.totalSeats;
    
            bus.plateNumber = plateNumber;
            bus.busTypeId = busTypeId;
            bus.status = status;
            bus.totalSeats = totalSeats;
    
            await bus.save();
    
           
            if (parseInt(totalSeats) !== parseInt(oldTotalSeats)) {
                const currentSeats = await SeatsModel.findAll({
                    where: { busID: id },
                    order: [['seatNumber', 'ASC']]
                });
    
               
                if (parseInt(totalSeats) < currentSeats.length) {
                    const seatsToRemove = currentSeats.slice(totalSeats);
                    for (const seat of seatsToRemove) {
                        await seat.destroy();
                    }
                } 

                else {
                    for (let i = currentSeats.length + 1; i <= totalSeats; i++) {
                        await SeatsModel.create({
                            busID: id,
                            seatNumber: `G${i}`,
                            status: 'empty'  
                        });
                    }
                }
            }
    
            res.status(200).json({
                success: true,
                message: "Cập nhật loại xe thành công",
                bus
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Cập nhật loại xe không thành công",
                error: error.message
            });
        }
    }
    
    
    // //------------------[ DELETE ]------------------
    static async delete(req, res) {
        try {
            const { id } = req.params;

            const bus = await BusesModel.findByPk(id);
            if (!bus) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }
    
            await SeatsModel.destroy({
                where: { busID: id }
            });
    
            await bus.destroy();
    
            res.status(200).json({
                success: true,
                message: "Xóa loại xe và ghế liên quan thành công"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Xóa không thành công",
                error: error.message
            });
        }
    }


    // ------------------[ GET BY STATUS ]------------------
    static async getAllBusByStatusCreate(req, res) {
        try {
            const buses = await BusesModel.findAll({
                where: {
                    status: "inactive"
                }
            });
    
            res.status(200).json({
                status: 200,
                success: true,
                message: "Lấy danh sách xe có trạng thái inactive thành công",
                data: buses
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllByStatusEdit(req, res) {
        try {
            const { tripId } = req.params; 
            const trip = await TripsModel.findOne({ where: { id: tripId } });

            const bus = await BusesModel.findAll({
                where: {
                    [Op.or]: [
                        { status: 'inactive' },
                        { id: trip.busID } 
                    ]
                }
            });
    
            res.status(200).json({
                status: 200,
                message: "Lấy danh sách tài xế cho chỉnh sửa thành công!",
                data: bus
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = BusesController;