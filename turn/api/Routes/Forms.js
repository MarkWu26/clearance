const express = require('express');
const router = express.Router();
const FormController = require('../Controllers/FormController');
const { check } = require('express-validator');

router.post('/', FormController.createForm);
router.get('/', FormController.getAllForms)
router.put('/forms/edit/:id', [check("officeAbbrev", "Invalid Office Abbreviation").isAlpha()], FormController.updateForm);
router.delete('/forms/delete/:id', FormController.deleteForm);
router.get('/forms/:id', FormController.getForms); 
router.get('/test', (req, res) => {
    res.json({ msg: "Hello!!" });
});

module.exports = router;
