const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const { check } = require('express-validator');
const JWT = require('jsonwebtoken');
//router.post('/', clearancePeriod.addPeriod);
router.post('/login', [ check("username", "Invalid username").isAlpha() ], authController.authenticate);


// router.post('/logout', authController.logout);
module.exports = router;