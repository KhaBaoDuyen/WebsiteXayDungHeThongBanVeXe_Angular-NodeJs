const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dayjs = require('dayjs');

let sentEmails = new Set();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quynhctppc08873@gmail.com',
    pass: 'nmyhrrpxvhfakwth',
  },
});


cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.get('http://localhost:3001/admin/booking/list');
    const bookings = response.data.data;
    console.log('📋 Số booking lấy về:', bookings.length);

    const now = dayjs();
    /* console.log('Giờ hiện tại (Việt Nam):', now.format('HH:mm:ss DD/MM/YYYY')); */


    bookings.forEach((booking) => {
      const status = booking.status;
      const email = booking.email;
      const departure = booking.startDate;
      const bookingId = booking.id;
      const startPoint = booking.startPoint;
      const endPoint = booking.endPoint;
      const fullName = booking.fullName;
      const finalPrice = booking.finalPrice;
 
      console.log('Booking:', { bookingId, status, email, departure });

      if (status === 'confirmed' && email && departure) {
        const startDate = dayjs(departure);
        console.log('Giờ khởi hàng của chuyến xe:', startDate.format('HH:mm:ss DD/MM/YYYY'));
        const diff = startDate.diff(now, 'minute');

        console.log(`Booking ID: ${bookingId}, Status: ${status}, Email: ${email}, Giờ khởi hành: ${startDate.format('HH:mm')}, Còn ${diff} phút`);
        console.log(' - Cron đang chạy lúc', now.format('HH:mm:ss'));
        /* console.log('Departure (raw):', departure);
        console.log('🇻🇳 Departure (Vietnam time):', departureTime.format('HH:mm:ss DD/MM/YYYY'));
        console.log('Now (Vietnam time):', now.format('HH:mm:ss DD/MM/YYYY'));
        console.log('Khoảng cách phút:', diff); */

        if (diff <= 30 && diff >= 29 && !sentEmails.has(bookingId)) {
          transporter.sendMail({
            from: '"Vé xe Bụi Đường" <quynhctppc08873@gmail.com>',
            to: email,
            subject: '⏰ Nhắc nhở chuyến xe sắp khởi hành',
            html: `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8; padding: 20px; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);">
    
    <div style="padding: 24px;">
      <h2 style="color: #007bff; margin-top: 0;">⏰ Nhắc nhở chuyến xe sắp khởi hành</h2>
      
      <p>Chào bạn <strong>${fullName}</strong>,</p>
      
      <p>Bạn có một chuyến xe sẽ <strong style="color: #d9534f;">khởi hành lúc ${startDate.format('HH:mm DD/MM/YYYY')}</strong>.</p>

      <p>
        <span style="display: inline-block; width: 120px;">🚏 Điểm đi:</span> <strong>${startPoint}</strong><br>
        <span style="display: inline-block; width: 120px;">🏁 Điểm đến:</span> <strong>${endPoint}</strong><br>
        <span style="display: inline-block; width: 120px;">💳 Giá vé:</span> 
        <strong style="color: #28a745;">${Number(finalPrice).toLocaleString('vi-VN')} VNĐ</strong>
      </p>

      <p style="margin-top: 20px;">Hãy đến sớm tại điểm đón để không bị lỡ chuyến nhé 🚐</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">
      
      <p style="font-size: 14px; color: #555;">
        Cảm ơn bạn đã đặt vé tại hệ thống của chúng tôi.<br>
        Chúc bạn có một chuyến đi <strong>an toàn và thuận lợi</strong>!
      </p>
      
      <p style="font-size: 14px; color: #999; margin-top: 12px;">Vé xe BỤI ĐƯỜNG</p>
    </div>
  </div>
</div>
`

          }, (err, info) => {
            if (err) {
              console.error('Lỗi gửi mail:', err);
            } else {
              console.log(`Đã gửi nhắc nhở cho ${email}`);
              sentEmails.add(bookingId);
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    console.error('🚨Lỗi khi lấy booking:', error.message);
  }
});
