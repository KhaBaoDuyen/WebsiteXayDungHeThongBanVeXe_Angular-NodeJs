require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { Sequelize } = require('sequelize');
const axios = require('axios');
const cron = require('node-cron');
const { TripsModel, BusesModel, DriverModel,SeatsModel, BookingModel } = require('../../models/connectModel');
const { Op } = require('sequelize');

const formatVNTime = (date) => {
    const vnTime = new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000);
    return vnTime.toISOString().replace('T', ' ').substring(0, 19);
};

// Hàm cập nhật trạng thái chuyến xe
async function updateTripStatuses() {
    const now = new Date();
    const vnNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    console.log("⏰ UTC now:", now.toISOString());
    console.log("⏰ Việt Nam now:", formatVNTime(now));

    // Chuyển từ scheduled => running
    const runningTrips = await TripsModel.findAll({
        where: {
            status: 'scheduled',
            departureTime: { [Op.lte]: now },
            arrivalTime: { [Op.gt]: now }
        }
    });

    for (const trip of runningTrips) {
        console.log(`🚍 Chuyến xe ${trip.id} chuyển từ "scheduled" => "running"`);

        // Log UTC và VN cho departureTime & arrivalTime
        console.log(`  🌐 UTC - departureTime: ${trip.departureTime}`);
        console.log(`  🌐 UTC - arrivalTime:   ${trip.arrivalTime}`);
        console.log(`  🇻🇳 VN  - departureTime: ${formatVNTime(trip.departureTime)}`);
        console.log(`  🇻🇳 VN  - arrivalTime:   ${formatVNTime(trip.arrivalTime)}`);

        trip.status = 'running';
        await trip.save();

        await BusesModel.update({ status: 'active' }, { where: { id: trip.busID } });
        await DriverModel.update({ status: 'active' }, { where: { id: trip.driverId } });
        // await BookingModel.update(
        //     { status: 'confirmed' },
        //     {
        //         where: {
        //             startDate: trip.departureTime
        //         }
        //     }
        // );
        
    }

    // Chuyển từ running => completed
    const completedTrips = await TripsModel.findAll({
        where: {
            status: 'running',
            arrivalTime: { [Op.lte]: now }
        }
    });

    for (const trip of completedTrips) {
        console.log(`🚍 Chuyến xe ${trip.id} chuyển từ "running" => "completed"`);

        console.log(`  🌐 UTC - departureTime: ${trip.departureTime}`);
        console.log(`  🌐 UTC - arrivalTime:   ${trip.arrivalTime}`);
        console.log(`  🇻🇳 VN  - departureTime: ${formatVNTime(trip.departureTime)}`);
        console.log(`  🇻🇳 VN  - arrivalTime:   ${formatVNTime(trip.arrivalTime)}`);

        trip.status = 'completed';
        await trip.save();

        await BusesModel.update({ status: 'inactive' }, { where: { id: trip.busID } });
        await DriverModel.update({ status: 'inactive' }, { where: { id: trip.driverId } });
        // await SeatsModel.update(
        //     { status: 'empty' },
        //     { where: { busID: trip.busID } }
        // );
    }
}

(async () => {
    console.log("🚀 Chạy ngay lập tức khi start:");
    await updateTripStatuses();
})();

cron.schedule('* * * * *', async () => {
    console.log("⏰ Đang cập nhật trạng thái chuyến xe...");
    await updateTripStatuses();
});

module.exports = updateTripStatuses;
