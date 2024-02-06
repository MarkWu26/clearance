const express = require('express');
const router = express.Router();
const clearancePeriod = require('../Controllers/ClearancePeriod');

//router.post('/', clearancePeriod.addPeriod);
router.get('/:unit', clearancePeriod.getList);

module.exports = router;