const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'test', //change this to your mySQL username 
  password: '12345678', //change this to your mySQL password
  database: 'test', //change this to your mySQL database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 5
});

module.exports.connection = connection;

module.exports.userTable = "users"; // Table for Users
module.exports.userUName = "uname"; // Table for Users
module.exports.userPWord = "pword"; // Table for Users
module.exports.courtTable = "courts"
// module.exports.