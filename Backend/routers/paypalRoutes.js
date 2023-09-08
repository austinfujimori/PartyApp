const express = require('express');
const router = express.Router();
const { initiatePayout } = require('../controllers/paypalController');

router.post('/payout', initiatePayout);

module.exports = router;
