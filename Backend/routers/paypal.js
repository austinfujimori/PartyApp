const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');

// Define the Payouts Endpoint
router.post('/payout', paypalController.handlePayout);

module.exports = router;