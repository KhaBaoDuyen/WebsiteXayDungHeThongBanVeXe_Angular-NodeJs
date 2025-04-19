const BookingModel = require('../../models/bookingModel');

class BookingController {
    // Lấy tất cả booking
    static async get(req, res) {
        try {
            const bookings = await BookingModel.findAll();
            res.status(200).json({
                success: true,
                message: "Lấy danh sách đặt vé thành công",
                data: bookings
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi lấy danh sách đặt vé",
                error: error.message
            });
        }
    }

    // Lấy booking theo ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByPk(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy đặt vé"
                });
            }
            res.status(200).json({
                success: true,
                message: "Lấy đặt vé thành công",
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi lấy đặt vé",
                error: error.message
            });
        }
    }

    // Cập nhật booking
    static async update(req, res) {
        try {
            const { id } = req.params;
            const {
                userId,
                startPoint,
                endPoint,
                status,
                finalPrice,
                fullName,
                phone,
                email,
                startDate,
                totalSeat
            } = req.body;

            const booking = await BookingModel.findByPk(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy đặt vé"
                });
            }

            await booking.update({
                userId,
                startPoint,
                endPoint,
                status,
                finalPrice,
                fullName,
                phone,
                email,
                startDate,
                totalSeat
            });

            res.status(200).json({
                success: true,
                message: "Cập nhật đặt vé thành công",
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi cập nhật đặt vé",
                error: error.message
            });
        }
    }

    // Xóa booking
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const booking = await BookingModel.findByPk(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy đặt vé"
                });
            }

            await booking.destroy();

            res.status(200).json({
                success: true,
                message: "Xóa đặt vé thành công"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Lỗi khi xóa đặt vé",
                error: error.message
            });
        }
    }
}

module.exports = BookingController;
