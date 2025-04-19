const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const mailConfig = require("../../config/mail");

const transporter = nodemailer.createTransport(mailConfig);

async function sendBookingMail(
  email,
  fullName,
  bookingId,
  startPoint,
  endPoint,
  startDate,
  seats,
  totalPrice
) {
  const subject = 'Xác nhận đặt vé thành công';

  const templatePath = path.join(__dirname, '../booking/index.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  html = html
    .replace('{{name}}', fullName)
    .replace('{{orderCode}}', bookingId)
    .replace('{{startPoint}}', startPoint)
    .replace('{{endPoint}}', endPoint)
    .replace('{{startDate}}', new Date(startDate).toLocaleString('vi-VN'))
    .replace('{{seats}}', seats)
    .replace('{{totalPrice}}', totalPrice.toLocaleString('vi-VN'));

  const mailOptions = {
    from: '"Vé Xe Bụi Đường" <Duyenktbpc08750@gmail.com>',
    to: email,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Lỗi gửi email đặt vé:", error);
  }
}

module.exports = sendBookingMail;
