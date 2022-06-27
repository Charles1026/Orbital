const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(8000, () => {
  console.log("Application started and Listening on port 8000");
});

// serve your css as static
app.use(express.static(__dirname));

// get our app to use body parser 
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/html/login.html");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  var uname = req.body.uname;
  var pswd = req.body.pswd;
  
});