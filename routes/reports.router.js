const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth');

const {
    renderReports
} = require('../controllers/reports.controller');

router.get('/reports', isAuthenticated, renderReports);

module.exports = router;