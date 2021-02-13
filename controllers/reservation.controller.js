const mongoose = require('mongoose');
const Reservation = require('../models/reservation.model');

const reservationController = {};

reservationController.renderReservation = async(req, res, next) => {
    const reservations = await Reservation.find();
    const reservationsUser = await Reservation.find({ user: req.user.id });
    const contDrivers = await Reservation.find({ status: true }).countDocuments();
    const contUserDrivers = await Reservation.find({ user: req.user.id }).countDocuments();

    if (contUserDrivers.length) {
        contUserDrivers = 0;
    }

    const drivers = (contDrivers - 8) * -1;
    if (drivers <= 0) {
        var block = true;
    } else {
        block = false;
    }

    console.log(reservationsUser);

    res.render('reservation', {
        title: 'Reservation',
        drivers,
        reservations,
        reservationsUser,
        contUserDrivers,
        block
    });
}

reservationController.checkReservation = async(req, res, next) => {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    reservation.status = !reservation.status;
    reservation.user = req.user.id;
    await reservation.save();
    res.redirect('/reservation');
}

reservationController.checkReservationUser = async(req, res, next) => {
    const { id } = req.params;
    const objectEmpty = new mongoose.Types.ObjectId("60271af90804cb1ae88aaaf6");
    const reservation = await Reservation.findById(id);
    reservation.status = !reservation.status;
    reservation.user = objectEmpty;
    console.log(objectEmpty);
    await reservation.save();
    res.redirect('/reservation');
}

reservationController.freeDrivers = async(req, res, next) => {
    await Reservation.updateMany({ status: true }, { status: false });
    await Reservation.updateMany({}, { user: new mongoose.Types.ObjectId("60271af90804cb1ae88aaaf6") });
    res.redirect('/reservation');
}

reservationController.freeDriversUser = async(req, res, next) => {
    const reservationsUser = await Reservation.updateMany({ status: true, user: req.user.id }, { status: false, user: new mongoose.Types.ObjectId("60271af90804cb1ae88aaaf6") });
    console.log(reservationsUser);
    res.redirect('/reservation');
}

module.exports = reservationController;