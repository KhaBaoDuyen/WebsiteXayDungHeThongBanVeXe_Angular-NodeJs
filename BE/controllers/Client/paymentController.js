const VnPayService = require('../../services/vnPayService');
const BookingModel = require("../../models/bookingModel");
const BookingDetailModel = require("../../models/bookingDetailModel");
const sendBookingMail = require('../../mail/booking/sendMail'); 

class PaymentController {
    static createPayment(req, res) {
        try {
            const { txnRef, finalTotal, returnUrl } = req.body;

            if (!txnRef || !finalTotal || !returnUrl) {
                return res.status(400).json({ 
                    success: false,
                    message: "Thiếu thông tin thanh toán" 
                });
            }

            const paymentUrl = VnPayService.createPaymentUrl(txnRef, finalTotal, returnUrl, req);
            return res.json({ 
                success: true,
                paymentUrl 
            });

        } catch (error) {
            console.error("Lỗi tạo URL thanh toán:", error);
            return res.status(500).json({ 
                success: false,
                message: "Lỗi server",
                error: error.message 
            });
        }
    }

    static async handlePaymentReturn(req, res) {
        try {
            const isValid = VnPayService.validateReturnUrl(req.query);
            if (!isValid) {
                return res.status(400).json({ 
                    success: false,
                    message: "Xác thực thanh toán thất bại" 
                });
            }

            const { 
                vnp_TxnRef, 
                vnp_ResponseCode,
                vnp_TransactionNo,
                vnp_Amount,
                vnp_BankCode,
                vnp_PayDate
            } = req.query;

            // Tìm booking bằng vnp_TxnRef 
            const booking = await BookingModel.findOne({
                where: { vnp_txn_ref: vnp_TxnRef.toString() }, 
                include: [{
                    model: BookingDetailModel,
                    as: 'bookingDetails',
                    attributes: ['seatNumber', 'price']
                }]
            });

            if (!booking) {
                return res.status(404).json({ 
                    success: false,
                    message: "Không tìm thấy đơn đặt vé!" 
                });
            }

            if (booking.paymentStatus === "paid") {
                return res.json({ 
                    success: true,
                    message: "Đơn đặt vé đã được thanh toán trước đó!", 
                    booking 
                });
            }

            if (vnp_ResponseCode === "00") {
                let paymentDate = null;
                if (vnp_PayDate) {
                    const payDateStr = vnp_PayDate.toString();
                    if (payDateStr.length === 14) {
                        const formattedPayDate = `${payDateStr.slice(0, 4)}-${payDateStr.slice(4, 6)}-${payDateStr.slice(6, 8)}T${payDateStr.slice(8, 10)}:${payDateStr.slice(10, 12)}:${payDateStr.slice(12, 14)}Z`;
                        paymentDate = new Date(formattedPayDate);
                    }
                }

                // Cập nhật thông tin thanh toán
                try {
                    await booking.update({
                      paymentStatus: "paid",
                      vnp_transaction_no: vnp_TransactionNo,
                      vnp_amount: vnp_Amount / 100,
                      vnp_bank_code: vnp_BankCode,
                      vnp_pay_date: paymentDate
                    });
                  } catch (e) {
                    console.error("Lỗi khi cập nhật booking:", e);
                  }
                  

                // Gửi email xác nhận
                const seats = booking.bookingDetails.map(d => d.seatNumber).join(', ');
                await sendBookingMail(
                    booking.email,
                    booking.fullName,
                    booking.id,
                    booking.startPoint,
                    booking.endPoint,
                    booking.startDate,
                    seats,
                    booking.finalPrice
                );

                return res.redirect('http://localhost:4200/timetable?payment=success');

            } else {
                //  khi thất bại
                await booking.update({ 
                    paymentStatus: "failed" 
                });
                return res.redirect('http://localhost:4200/timetable?payment=failed');
            }

        } catch (error) {
            console.error("Lỗi xử lý phản hồi thanh toán:", error);
            return res.status(500).json({ 
                success: false,
                message: "Lỗi server",
                error: error.message 
            });
        }
    }
}

module.exports = PaymentController;
