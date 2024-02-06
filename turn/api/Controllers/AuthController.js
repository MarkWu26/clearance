const bcrypt = require('bcrypt');
const db = require('../utils/db');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');

require("dotenv").config();

const authenticate = async (req, res) => {
    
    const { username, password } = req.body;
    //check validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
    }
   let user;
    
    if (username && password) {
        db.execute('SELECT * from users WHERE username = ?',[username], async (err, data) => {
            if(err){
                console.log(err)
                return res.json({success: false, error: "Database error"});
            }

            console.log(data)
            
             if(data.length > 0){
               //hash password match
               user = { id: data[0].id, username: data[0].username, password: data[0].password, rights: data[0].rights, unit: data[0].unit  
                };
                
            } 

           /*  if(!user){
                return res.status(401).json(
                    {
                        errors: [{
                        msg: "User not found",
                        }]
                    }
                    );
            }
            
            let match = await bcrypt.compare(password, user.password);
 */
           /*  if(!match){
                // req.session.user_id = data[0].id;
                // req.session.user_name = data[0].username;
                // req.session.user_type = data[0].type;
                // req.session.user_rights = data[0].rights;
                
                 return res.status(401).json(
                {
                    errors: [{
                    msg: "Email or password is invalid",
                    }]
                }
                );

            } */
            //console.log(process.env);
            //  req.session.user_id = data[0].id;
            //  req.session.user_name = username;
            //  req.session.user_unit = user.unit;
            //  req.session.user_rights = user.rights;
            //  req.session.save();
            //  console.log(req.session.user_name);

            const accessToken = await JWT.sign({ username, rights: user.rights, unit: user.unit }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "30m",
            });
            res.json({
                accessToken
            });
    
        });
       
        
     
        //return res.json({success: false, error: 'Empty credentials'});
    }

   // return res.json({success: false, error: "Username and Password does not match"});
    

};





module.exports = {
    authenticate, 
    
}