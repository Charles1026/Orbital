const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //change this to your mySQL username 
  password: 'nY=P3<.8=n$a*#Y', //change this to your mySQL password
  database: 'orbitalusers' //change this to your mySQL database
});

module.exports = connection;