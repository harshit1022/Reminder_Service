const express = require('express');
const TicketController = require('../../controllers/ticket-controller');

const router = express.Router();

router.post('/tickets', TicketController.create);

module.exports = router;