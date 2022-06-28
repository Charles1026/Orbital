const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('./session')

const htmlPath = "/html/";
module.exports.htmlPath = htmlPath;

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));

app.use(cookieParser());

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

//Main page
app.get("/", (req, res) => {
    console.log("Incoming Request to Index");
    res.sendFile(__dirname + htmlPath + "index.html");
});

//Login page
app.get("/login", (req, res) => {
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

    res.sendFile(__dirname + htmlPath + "login.html");
});

const loginHandler = require("./handlers/loginHandler")
app.post("/login", loginHandler);

//Profile Page
app.get("/profile", (req, res) => {
    console.log("Incoming Request to Profile");

    console.log("Incoming Profile Get Request");
    if (!req.cookies) {
        res.redirect('/login');
    }
    const sessionToken = req.cookies[session.sessionName];
    if(!sessionToken || !session.validateSession(sessionToken)) {
        res.redirect('/login');
    }

    res.sendFile(__dirname + htmlPath + "profile.html");
});

const userRouter = require("./routes/users");
const registerRouter = require("./routes/register");

app.use("/users", userRouter);
app.use("/register", registerRouter);
