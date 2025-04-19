const { Op } = require("sequelize");
const RoutesModel = require("../../models/routesModel.js");
const TripsModel = require("../../models/tripsModel.js");
const BusesModel = require("../../models/busesModel.js");
const BusTypesModel = require("../../models/busTypesModel.js");
const SeatsModel = require("../../models/seatsModel.js");
const { add } = require('date-fns');
const BookingModel = require("../../models/bookingModel.js");
const BookingDetailModel = require("../../models/bookingDetailModel.js");
class HistoryBookingController {

    static async historyTicket(req, res) {
        try {
            const { id } = req.body;

            const history = await BookingModel.findAll({
                where: { userId: id },
                include: [
                    {
                        model: BookingDetailModel,
                        as: "bookingDetails",
                    }
                ], order: [
                    ['id', 'DESC']
                ]
            });

            res.status(200).json({
                status: 200,
                success: true,
                message: "Lấy dữ liệu history thành công",
                data: history,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: "Lỗi khi lấy lịch sử vé",
            });
        }
    }

    static async cancelTicket(req, res) {
        const { id, note } = req.body;

        try {
            const cancel = await BookingModel.update(
                {
                    status: 'canceled',
                    note: note
                },
                {
                    where: {
                        id: id
                    },
                    returning: true // trả về các bảng ghi được cập nhật
                }
            );
            
                const booking = await BookingModel.findOne({
                    where: { id: id },
                    include: [
                        {
                            model: BookingDetailModel,
                            as: 'bookingDetails',
                            include: [
                                {
                                    model: SeatsModel,
                                    as: 'bookingSeats'
                                }
                            ]
                        }
                    ]
                });
            
                if (booking) {
                    for (const detail of booking.bookingDetails) {
                        if (detail.seatId) {
                            await SeatsModel.update(
                                { status: "empty" }, 
                                {
                                    where: {
                                        id: detail.seatId
                                    }
                                }
                            );
                        }
                    }
                }
            
                return res.status(200).json({
                    success: true,
                    message: 'Vé đã được hủy thành công .'
                });
            
          
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra.'
            });

        }
    }


}

module.exports = HistoryBookingController;
