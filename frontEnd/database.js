const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root', //change this to your mySQL username 
  password: 'nY=P3<.8=n$a*#Y', //change this to your mySQL password
  database: 'orbitalusers', //change this to your mySQL database
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 5
});

module.exports.connection = connection;

module.exports.userTable = "users"; // Table for Users
module.exports.userUName = "username"; // Table for Users
module.exports.userPWord = "password"; // Table for Users
module.exports.userEmail = "email"; // Table for Users
module.exports.userPos = "pos"; // Table for Users
module.exports.userExp = "exp"; // Table for Users
module.exports.courtTable = "courts"
// module.exports.