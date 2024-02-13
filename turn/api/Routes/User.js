const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const { check } = require('express-validator');
const JWT = require('jsonwebtoken');

router.post('/register', [check("username", "Invalid username").isAlpha()], userController.registerUser);
router.put('/user/edit/', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);
router.get('/user/:id', userController.getUsers);  
router.get('/getall', userController.getAllUsers); 
router.get('/getUserTypes', userController.getUserTypes); 
router.get('/test', (req, res) => {
    res.json({ msg: "Hello!!" });
});

module.exports = router;
