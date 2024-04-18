const mysql = require('mysql2');
const opsdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ops',
    connectTimeout: 30000
});


module.exports = opsdb;
