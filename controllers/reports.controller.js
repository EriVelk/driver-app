const reportsController = {};

//Models
const Reservation = require('../models/reservation.model');
const User = require('../models/user.model');

reportsController.renderReports = async(req, res, next) => {
    const drivers = await Reservation.find({ status: true }).populate('user');

    res.render('reports/reports', {
        title: 'Drivers List',
        drivers
    })
}


module.exports = reportsController;