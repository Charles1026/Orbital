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
app.use(express.static(path.join(__dirname, "/public/")));

app.use(cookieParser());

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './pug')
app.set('view engine', 'pug')

//Main page
app.get("/", (req, res) => {
  console.log("Incoming Request to Index");
  res.render("index")
});

const loginRouter = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");
const registerRouter = require("./routes/register.js");
const logoutRouter = require("./routes/logout.js");

app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
