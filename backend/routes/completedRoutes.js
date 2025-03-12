const express = require('express');
const router = express.Router();
const completedControllers = require('../controllers/completedController');

router.get('/', completedControllers.getCompletedAll);
module.exports = router;