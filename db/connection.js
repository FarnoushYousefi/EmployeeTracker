const mysql = require('mysql');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Fargol1351',
    database: 'employees_DB',
  },
  console.log('Connected to the election database.')
);
module.exports = db;
