const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
    res.sendFile(__dirname + htmlPath + "login.html");
});

const loginHandler = require("./handlers/loginHandler")
app.post("/login", loginHandler);

const userRouter = require("./routes/users");
const registerRouter = require("./routes/register");

app.use("/users", userRouter);
app.use("/register", registerRouter);
