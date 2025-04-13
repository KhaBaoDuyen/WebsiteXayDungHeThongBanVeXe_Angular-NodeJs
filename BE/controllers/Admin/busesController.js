const BusesModel = require('../../models/busesModel');
class BusesController {
    static async get(req, res) {
        try {
            const buses = await BusesModel.findAll();
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công",
                "data": buses
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = BusesController;