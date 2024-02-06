const express = require('express');
const router = express.Router();
const unitController = require('../Controllers/UnitController');
const { check } = require('express-validator');
const JWT = require('jsonwebtoken');
//router.post('/', clearancePeriod.addPeriod);

router.post('/',[ check("name", "Invalid Unit Abbreviation").isAlpha() ], unitController.createUnit);
router.post('/edit',[ check("name", "Invalid Unit Abbreviation").isAlpha() ], unitController.updateUnit);
router.post('/delete', unitController.deleteUnit);
router.get('/', unitController.getUnits); 
router.post('/units/config', unitController.createConfig);
router.post('/units/config/:id', unitController.editConfig);
// Example route configuration
router.get('/units/config/:id', unitController.getConfig);
router.get('/test', (req, res) => {
    res.json({msg: "Hello!!"});
});
module.exports = router;