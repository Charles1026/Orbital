const express = require("express");
const app = express();
const path = require("path");

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

const userRouter = require("./routes/users");
const registerRouter = require("./routes/register");

app.use("/users", userRouter);
app.use("/register", registerRouter);