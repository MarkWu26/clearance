const db = require('../utils/db');

const getList = ((req, res) => {
    
    const {unit} = req.params;
    console.log(unit);
    db.execute('SELECT * FROM clearance_period WHERE `is_active` = ? AND `unit` = ?',['1', unit], (err, res, fields) => {
        res.send(res);
    });
    
});


module.exports = {
    getList
}