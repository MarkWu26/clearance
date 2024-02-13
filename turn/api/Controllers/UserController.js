const bcrypt = require('bcrypt');
const db = require('../utils/db');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    const { username, password, rights, type, unit } = req.body;

    console.log('type: ', type, 'unit: ', unit)

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        // Check if the username is already registered
        const existingUser = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return res.status(400).json({
                errors: [
                    {
                        username: username,
                        message: "The user is already registered",
                    },
                ],
            });
        }

        // Hash the password
        const hashedPass = await bcrypt.hash(password, 10);

        // Insert the new user into the database without specifying 'id'
        const result = await db.execute('INSERT INTO users (username, password, rights, type, unit) VALUES (?, ?, ?, ?, ?)', [username, hashedPass, rights, type, unit]);

        console.log('result: ', result)

        res.json({
            success: true,
            insertedId: result.insertId,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({
            success: false,
            error: "Server error during user registration",
        });
    }
};

const getUsers = (req, res) => {
    const userId = req.params.id;

    // Validate the user ID
    if (!userId) {
        return res.status(400).json({
            error: 'User ID is required'
        });
    }

    db.execute('SELECT * from users left join units ON users.unit = units.id WHERE id = ?', [userId], (err, data) => {
        if (err) {
            console.log(err)
            return res.json({success: false, error: "Database error"});
        }
        
        if (data.length === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

      

        res.json({
            success: true,
            user: data[0]
        });
    });
};

const getAllUsers = (req, res) => {
    // Execute a query to select all users
    db.execute(`SELECT user.id, user.username, user.password, user.type, user.rights, unit.abbrev as unit_abbrev, unit.id as unit_id, unit.description, type.name as type_name, type.id as type_id
    from users AS user 
    LEFT JOIN units AS unit ON user.unit = unit.id 
    LEFT JOIN user_types as type ON user.type = type.id`, (err, data) => {
        if (err) {
            console.log("Database error", err);
            return res.json({ success: false, error: "Database error" });
        }
        
        
        if (data.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        console.log('users: ', data)

        res.json({
            success: true,
            users: data
        });
    });
};


const updateUser = async (req, res) => {
   /*  const userId = req.params.id; */
   console.log('HIIIIIIII');
    const { userId , username, password, rights, type, unit } = req.body;
    console.log('TEST DATA: ', userId, username, password, rights, type, unit)
    console.log('the user id is: ', userId)
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    if (username && password) {
        // First, check if the new username already exists in the database (if it's changed)
        db.execute('SELECT * from users WHERE username = ? AND id != ?', [username, userId], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, error: "Database error" });
            }
            if (data.length > 0) {
                return res.status(400).json({
                    errors: [
                        {
                            username: username,
                            message: "The username is already taken by another user"
                        }
                    ]
                });
            }

            // Hash the new password
            bcrypt.hash(password, 10, (err, hashedPass) => {
                if (err) {
                    console.log(err);
                    return res.json({ success: false, error: "Hashing error" });
                }

                // Update the user's details in the database
                db.execute('UPDATE users SET username = ?, password = ?, rights = ?, type = ?, unit = ? WHERE id = ?', 
                           [username, hashedPass, rights, type, unit, userId], 
                           (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, error: "Database error" });
                    }
                    res.json({ success: true, message: "User updated successfully!" });
                });
            });
        });
    } else {
        res.status(400).json({ success: false, error: "Username and password are required" });
    }
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    console.log('the user id isss: ', userId)

    // Validate if userId is provided
    if (!userId) {
        return res.status(400).json({
            success: false,
            error: "User ID is required."
        });
    }

    // Delete the user from the database based on the provided ID
    db.execute('DELETE FROM users WHERE id = ?', [userId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, error: "Database error" });
        }

        // Check if any rows were affected (i.e., the user was actually deleted)
        if (data.affectedRows == 0) {
            return res.status(404).json({ success: false, error: "User not found." });
        }

        res.json({ success: true, message: "User deleted successfully!" });
    });
};


const getUserTypes = (req, res) => {
  // Execute a query to select all users
  db.execute('SELECT * FROM user_types', (err, data) => {
    if (err) {
        console.log("Database error", err);
        return res.json({ success: false, error: "Database error" });
    }
    
    
    if (data.length === 0) {
        return res.status(404).json({ error: 'No users found' });
    }

    console.log('types : ', data)

    res.json({
        success: true,
        userTypes: data
    });
});
}

module.exports = {
    registerUser,
    getUsers,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserTypes
};