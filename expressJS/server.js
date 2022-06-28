const express = require("express");
const app = express();
const path = require("path");
const dbConnection = require("./database");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false }) //depends on what type of POST we are using

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

//Main page
app.get("/", (req, res) => {
    console.log("Incoming Request to Index");
    res.sendFile(path.join(__dirname, "../frontEnd", "index.html"));
});

//Login page
app.get("/login.html", (req, res) => {
    console.log("Incoming Request to Login");
    res.sendFile(path.join(__dirname, "../frontEnd", "login.html"));
});

//Login attempt
app.post("/login.html", urlencodedParser, (req, res) => {
    console.log("Incoming Login");
    const { inputUsername, inputPassword } = req.body;

    dbConnection.query(
        `SELECT * FROM orbitalusers.users WHERE username = '${inputUsername}'`, 
        (err, results, fields) => {
            if (err) {
                console.log("Login Unsuccessful");
                return console.log(err); //Server crashes without the return statement (think its cause the error is thrown, causing the server to stop without a return statement)
            }
           
            //query will return an array as username is unique and thus, we can use results[0] to access the only row given back from mySQL
            if (results.length == 1) { //Array has the only row needed
                console.log("Username Exists");
                accountPassword = results[0].password;

                if (inputPassword == accountPassword) {
                    console.log("Login Successsful");
                    res.status(200).send("Login Successful");
                } else {
                    console.log("Invalid Password");
                    res.status(401).send("Invalid Password");
                }
            } else {
                console.log("Username Does Not Exist");
                res.status(401).send("User Not Found");
            }
        })
    
    //So apparently calling dbConnection.end() closes the connection for good and future posts will not open the connection again so


});

const userRouter = require("./routes/users");
const registerRouter = require("./routes/register");

app.use("/users", userRouter);
app.use("/register", registerRouter);