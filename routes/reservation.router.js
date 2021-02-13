const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

//Importing Controller
const {
    renderReservation,
    checkReservation,
    freeDrivers,
    checkReservationUser,
    freeDriversUser
} = require('../controllers/reservation.controller');


router.get('/reservation', isAuthenticated, renderReservation);

router.get('/reservation/check/:id', isAuthenticated, checkReservation);

router.get('/reservation/check/user/:id', isAuthenticated, checkReservationUser);

router.get('/reservation/free', isAuthenticated, freeDrivers);

router.get('/reservation/free/user', isAuthenticated, freeDriversUser);

module.exports = router;