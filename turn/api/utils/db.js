const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'central_cls',
    connectTimeout: 30000
});


module.exports = db;
