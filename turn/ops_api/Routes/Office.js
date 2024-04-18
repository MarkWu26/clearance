const express = require('express');
const router = express.Router();
const officeController = require('../Controllers/OfficeController');
const { check } = require('express-validator');
const JWT = require('jsonwebtoken');
const verifyToken = require('../middleware');


router.get('/', verifyToken, officeController.getOfficesAvailable); 
router.get('/test', (req, res) => {
    res.json({msg: "Hello!!"});
});
module.exports = router;