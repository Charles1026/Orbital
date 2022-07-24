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

// Table to Store Users
module.exports.userTable = "users"; // Table for Users
module.exports.userUName = "uname"; // Table for Users
module.exports.userPWord = "pword"; // Table for Users
module.exports.userEmail = "email"; // Table for Users
module.exports.userPos = "pos"; // Table for Users
module.exports.userExp = "exp"; // Table for Users

// Table to store Courts 
module.exports.courtTable = "courts" // id creator-id postal-code indoors 

// Table to store current Games
module.exports.currGamesTable = "currGames" // id creator-id court-id

// table to archive past Games
module.exports.pastGamesTable = "pastGames"

// module.exports.