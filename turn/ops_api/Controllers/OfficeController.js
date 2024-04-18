
const opsdb = require('../utils/opsdb');

const getOfficesAvailable = (req, res) => {

    let offices = [];
    
    
    opsdb.execute('SELECT office from p_office ORDER BY office ASC', [],  (err, data) => {

        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }
     
            for (i = 0; i < data.length; i++){
               
                offices.push(data[i].office.trim());
            }
         
            return res.status(200).json(offices);  
   
    });
   
};



module.exports = {getOfficesAvailable,}