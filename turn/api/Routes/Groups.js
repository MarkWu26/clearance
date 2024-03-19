const express = require('express');
const router = express.Router();
const GroupController = require('../Controllers/GroupsController');
const { check } = require('express-validator');

router.get('/', GroupController.getGroups); 
router.get('/test', (req, res) => {
    res.json({msg: "Hello!!"});
});
module.exports = router;