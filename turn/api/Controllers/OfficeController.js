const db = require('../utils/db');
const opsdb = require('../utils/opsdb');
const { validationResult } = require('express-validator');
const helper = require('../services/helper')

const createOffice = async (req, res) => {

    var { name, abbrev, unit_id, type } = req.body;
    //check validation errors
    name = helper.sql_safe(name);
    abbrev = helper.sql_safe(abbrev);
    type = helper.sql_safe(type);

   

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         errors: errors.array(),
    //     });
    // }
  
    const unit = await helper.getUnitResource(unit_id);
    
    
    db.execute('INSERT INTO clearing_offices (name, abbrev, unit, unit_id, type) VALUES (?, ?, ?, ?, ?)', [name, abbrev, unit, unit_id, type], (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }else{
            res.json({
                success: true
            });
        }

         
   
    });
   
};


const getOffices = (req, res) => {

    let Offices = [];
    db.execute('SELECT * from clearing_offices', (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }
        for (i = 0; i < data.length; i++){
            Offices.push({id: data[i].id, name: helper.decodeHtml(data[i].name), abbrev: helper.decodeHtml(data[i].abbrev), unit: data[i].unit, type: data[i].type});
        }
       
        return res.status(200).json(Offices);

    });
}

const deleteOffice = (req, res) => {
    //check if has active clearance period
    const id  = req.params.id;
    
    //check if used
    db.execute('SELECT office_id FROM clearance_frm WHERE office_id = ?',[id], (err, data) => {
        if(err){
            console.log(err)
            return err;
        }
       
        if(data.length > 0){
                return res.json({success: false, error: "Cannot delete: Clearance Office is currently in form."});     
        } else{
            db.execute('DELETE FROM clearing_offices WHERE id = ?',[id], (err, data) => {
                if(err){
                    console.log(err)
                    return res.json({success: false, error: "Database error"});
                }

              return res.status(200).json({success: true});
                    });
    

        
        };
    
    });
    
    
};




const updateOffice = async (req, res) => {

    const { name, abbrev, unit_id, type } = req.body;
    const { id } = req.params;

    
    //check validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const unit = await helper.getUnitResource(unit_id);
    db.execute('UPDATE clearing_offices SET name = ?, abbrev = ?, unit = ?, unit_id = ?, type = ? WHERE id = ?', [name, abbrev, unit, unit_id, type, id], (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }else{
            res.json({
                success: true
            });
        }
   
    });
   
};

const getOfficesAvailable = (req, res) => {

    
    // if(!errors.isEmpty()){
    //     return res.status(400).json({ success: false,
    //         errors: errors.array(),
    //     });
    // }
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


module.exports = {
    createOffice,
    getOffices,
    deleteOffice,
    updateOffice,
    getOfficesAvailable
}