const db = require('../utils/db');

const getAllClearance = ((req, res) => {
    db.execute('SELECT * from active_clearance_hdr', (err, res, fields) => {
        console.log(res);
        console.log(fields);
    });
    res.json({message: 'Success!'});
});


module.exports = {
        getAllClearance
}