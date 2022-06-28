const express = require("express");
const router = express.Router();
const session = require('../session');
const path = require("path");

router
  .route("/")
  //Getting the personal particulars
  .get((req, res) => {
    console.log("Incoming Request to Profile");
  
    console.log("Incoming Profile Get Request");
    if (!req.cookies) {
      res.redirect('/login');
    }
    const sessionToken = req.cookies[session.sessionName];
    if(!sessionToken || !session.validateSession(sessionToken)) {
      res.redirect('/login');
    }
  
    res.sendFile(path.join(__dirname, "../html/", "profile.html"));
  })
  //Updating personal particulars
  .put((req, res) => {
    console.log("Incoming Request to Update Profile");
    res.send("testing");
  })
  //Deleting personal particulars
  .delete((req, res) => {
    console.log("Incoming Request to Delete Profile");
    res.send("testing");
  })

module.exports = router;