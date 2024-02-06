const express = require('express');
const router = express.Router();
const officeController = require('../Controllers/OfficeController');
const { check } = require('express-validator');
const JWT = require('jsonwebtoken');


router.post('/', officeController.createOffice);
router.put('/:id',[ check("abbrev", "Invalid Office Abbreviation").isAlpha() ], officeController.updateOffice);
router.delete('/:id', officeController.deleteOffice);
router.get('/', officeController.getOffices); 
router.get('/available', officeController.getOfficesAvailable); 
router.get('/test', (req, res) => {
    res.json({msg: "Hello!!"});
});
module.exports = router;