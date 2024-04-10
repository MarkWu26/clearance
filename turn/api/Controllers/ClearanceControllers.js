const db = require('../utils/db');

const getAllClearance = ((req, res) => {
    db.execute('SELECT * from active_clearance_hdr', (err, res, fields) => {
        console.log(res);
        console.log(fields);
    });
    res.json({message: 'Success!'});
});

const getActiveHoldlist = (req, res) => {
    let items = []
    db.execute('SELECT id, stud_id, name, remarks, description, year FROM active_holdlist', (err, data) => {

        if(err){
            console.log('error: ', err);
            return res.json({success: false, error: "Database error"})
        }

        return res.status(200).json(data)

    })
}


module.exports = {
        getAllClearance,
        getActiveHoldlist
}