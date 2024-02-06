const db = require('../utils/db');
const { validationResult } = require('express-validator');


const createUnit = ((req, res) => {

    const { name, desc } = req.body;
    //check validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    
    
    db.execute('INSERT INTO units (abbrev, description) VALUES (?, ?)', [name, desc], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: "Database error" });          
        }else{
            res.json({
                success: true
            });
        }

         
   
    });
   
});

const getUnits = (req, res) => {

    let units = [];
    db.execute('SELECT * from units', (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }
        for (i = 0; i < data.length; i++){
            units.push({id: data[i].id, name: data[i].abbrev, desc: data[i].description});
        }
       
        return res.status(200).json(units);

    });
}

const deleteUnit = (req, res) => {
    //check if has active clearance period
    const {id} = req.body;
    db.execute('SELECT * from clearance_period WHERE unit_id = ?',[id], (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }
        
        if(data.length > 0){
            return res.status(400).json({
                success: false,
                error: "Unit already in use",
            });
        }else{
            db.execute('DELETE FROM units WHERE id = ?',[id], (err, data) => {
                if(err){
                    console.log(err)
                    return res.json({success: false, error: "Database error"});
                }
                
                return res.status(200).json({success: true});
            });
        }
 {

 }      

    });

}

const updateUnit = ((req, res) => {

    const { id, name, desc } = req.body;
    //check validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    
    
    db.execute('UPDATE units SET abbrev = ?, description = ? WHERE id = ?', [name, desc, id], (err, data) => {
        if(err){
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }else{
            res.json({
                success: true
            });
        }

         
   
    });
   
});

const getConfig = (req, res) => {
    const id = req.params.id;
    console.log('Fetching configuration for id:', id);

    db.execute('SELECT * FROM unit_config WHERE unit_id = ?', [id], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: "Database error" });
        }

        if (data.length > 0) {
            res.json({ success: true, config: data[0] });
        } else {
            console.warn(`Configuration not found for unit ID ${id}`);
            res.status(404).json({ success: false, error: "Configuration not found" });
        }
    });
};

  

const createConfig = (req, res) => {
    const { unit_id, main, identifier, f_fname, f_lname, f_mname, f_suffix, f_group, f_level, t_joins } = req.body;
    const c_joins = req.body.c_joins;

    // First, insert the main configuration record
    const configQuery = 'INSERT INTO unit_config (...) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.execute(configQuery, [unit_id, main, identifier, f_fname, f_lname, f_mname, f_suffix, f_group, f_level, t_joins], (err, result) => {
        if (err) {
            // handle error
        }

        const configId = result.insertId;
        
        // Next, insert each join condition
        c_joins.forEach(join => {
            const joinQuery = 'INSERT INTO config_joins (config_id, tbl, onLeft, onRight) VALUES (?, ?, ?, ?)';
            db.execute(joinQuery, [configId, join.tbl, join.onLeft, join.onRight], joinErr => {
                if (joinErr) {
                    // handle error
                }
            });
        });

        res.status(201).json({ success: true, message: "Configuration created" });
    });
};


const editConfig = (req, res) => {
    const configId = req.params.id;
    const { main, identifier, f_fname, f_lname, f_mname, f_suffix, f_group, f_level, t_joins } = req.body;
    const c_joins = req.body.c_joins;

    // Update the main configuration record
    const updateConfigQuery = 'UPDATE unit_config SET main = ?, identifier = ?, f_fname = ?, f_lname = ?, f_mname = ?, f_suffix = ?, f_group = ?, f_level = ? WHERE id = ?';

    db.execute(updateConfigQuery, [main, identifier, f_fname, f_lname, f_mname, f_suffix, f_group, f_level, configId], (updateError, updateResult) => {
        if (updateError) {
            console.error('Error updating main configuration:', updateError);
            console.error('SQL Query:', updateConfigQuery);
            return res.status(500).json({ success: false, error: 'Error updating main configuration' });
        }

        // Delete old joins
        const deleteJoinsQuery = 'DELETE FROM config_joins WHERE config_id = ?';

        db.execute(deleteJoinsQuery, [configId], (deleteError) => {
            if (deleteError) {
                console.error('Error deleting old joins:', deleteError);
                return res.status(500).json({ success: false, error: 'Error deleting old joins' });
            }

            // Insert new join conditions
            const insertJoinQuery = 'INSERT INTO config_joins (config_id, tbl, onLeft, onRight) VALUES (?, ?, ?, ?)';

            // Use Promise.all to handle asynchronous nature of db.execute
            Promise.all(c_joins.map(join => {
                return new Promise((resolve, reject) => {
                    db.execute(insertJoinQuery, [configId, join.tbl, join.onLeft, join.onRight], (insertError) => {
                        if (insertError) {
                            console.error('Error inserting new join:', insertError);
                            reject(insertError);
                        } else {
                            resolve();
                        }
                    });
                });
            })).then(() => {
                res.json({ success: true, message: 'Configuration updated successfully' });
            }).catch((error) => {
                console.error('Error in Promise.all:', error);
                res.status(500).json({ success: false, error: 'Error inserting new joins' });
            });
        });
    });
};


module.exports = {
    createUnit,
    getUnits,
    deleteUnit,
    updateUnit,
    createConfig,
    editConfig,
    getConfig
}