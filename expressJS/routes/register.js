const express = require("express");
const router = express.Router();
const dbConnection = require("../database");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false }) //depends on what type of POST we are using

//Accessing the registration page
router.get("/", (req, res) => {
    console.log("Incoming Request to Register");
    res.sendFile(path.join(__dirname, "../frontEnd", "register.html")); //TODO: register.html does not exist yet
});

//Creating an account 
router.post("/", urlencodedParser, (req, res) => { //might have to change the parser depending on the type of POST
    console.log("Incoming Registration");
    const { username, password } = req.body;

    dbConnection.query(
        `INSERT INTO users VALUES(DEFAULT,'${username}', '${password}')`, 
        (err, results, fields) => {
            if (err) {
                console.log("Account Creation Unsuccessful");

                if (err.errno == 1062) { //Duplicate entry
                    res.status(409).send("Username already taken");
                }

                return console.log(err); //Server crashes without the return statement (think its cause the error is thrown, causing the server to stop without a return statement)
            }
            
            console.log("Account Created");
            res.status(201).send("Account successfully created");
        })
});

module.exports = router;