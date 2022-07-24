const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const dbConnection = require("../database");
const server = require("../server")
const session = require('../session')
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false }) //depends on what type of POST we are using

//Accessing the registration page
router.get("/", (req, res) => {
    console.log("Incoming Request to Register");

    if (req.cookies) {
        const sessionToken = req.cookies[session.sessionName];
        if (sessionToken && session.validateSession(sessionToken)) {
          console.log("Alr In Session, No Registration");
          res.cookie(session.sessionName, sessionToken);
          res.redirect('/');
          return;
        }
    }

    res.render("register");
});

//Creating an account 
router.post("/", urlencodedParser, (req, res) => { //might have to change the parser depending on the type of POST
    console.log("Incoming Registration");
    if (req.cookies) {
        const sessionToken = req.cookies[session.sessionName];
        if (sessionToken && session.validateSession(sessionToken)) {
          console.log("Alr In Session, No Registration");
          res.cookie(session.sessionName, sessionToken);
          res.redirect('/');
          return;
        }
    }

    const {uname, pswd, email, pos, exp} = req.body;

    dbConnection.connection.query(
        `INSERT INTO ${dbConnection.userTable} VALUES(NULL,'${uname}', '${pswd}', '${email}', '${pos}', '${exp}')`, 
        (err, results, fields) => {
            if (err) {
                console.log("Account Creation Unsuccessful");

                if (err.errno == 1062) { //Duplicate entry
                    res.status(409).send("Username already taken");
                }

                return console.log(err); //Server crashes without the return statement (think its cause the error is thrown, causing the server to stop without a return statement)
            }
            
            console.log("Account Created");
            res.redirect('/login');
        })
});

module.exports = router;