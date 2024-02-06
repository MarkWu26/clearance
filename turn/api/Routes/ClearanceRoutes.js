const express = require('express');
const router = express.Router();
const clearanceController = require('../Controllers/ClearanceControllers')

router.get('/', clearanceController.getAllClearance);


module.exports = router;