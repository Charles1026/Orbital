const express = require("express");
const router = express.Router();
const session = require('../session');
const path = require("path");
const dbConnection = require("../database");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

router.route("/")
  //Getting the personal particulars
  .get((req, res) => {
    console.log("Incoming Request to Login");
  
    if (req.cookies) {
      const sessionToken = req.cookies[session.sessionName];
      if (sessionToken && session.validateSession(sessionToken)) {
        console.log("Alr In Session, No Login");
        res.cookie(session.sessionName, sessionToken);
        res.redirect('/');
        return;
      }
    }
  
    res.render("login");
  })
  .post((req, res) => {
    console.log("Incoming Login Post Request");
      if (req.cookies) {
        const sessionToken = req.cookies[session.sessionName];
        if (sessionToken && session.validateSession(sessionToken)) {
          console.log("Login Success");
          res.cookie(session.sessionName, sessionToken);
          res.redirect('/');
          return;
        }
      }
    
    const { uname, pswd } = req.body;
    console.log(req.body);
    dbConnection.connection.query(
      `SELECT * FROM ${dbConnection.userTable} WHERE ${dbConnection.userUName} = '${uname}'`, 
      (err, results, fields) => {
          if (err) {
            console.log("Login Unsuccessful:" + err.stack);
            res.status(500).send("Error, Please Try Again");
            return;
          }
  
          // query will return an array as username is unique and thus, we can use results[0] to access the only row given back from mySQL
          if (results.length == 1) { // Array has the only row needed
            console.log("Username Exists");
            accountPassword = results[0][dbConnection.userPWord];
  
            if (pswd == accountPassword) {
                console.log("Login Successsful");
                const sessionToken = session.createSession(results[0], 10 * 60 * 1000);
                res.cookie(session.sessionName, sessionToken);
                res.redirect('/');
                return;
            }
            console.log("Invalid Password");
            res.status(401).send("Invalid Password");
            return;
          }
          console.log("Username Does Not Exist");
          res.status(401).send("User Not Found");
  
      })
    })

module.exports = router