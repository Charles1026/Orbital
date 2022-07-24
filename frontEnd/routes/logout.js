const express = require("express");
const router = express.Router();
const session = require('../session');

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

router.route("/")
  .get((req, res) => {
    console.log("Incoming Logout Request");
    if (req.cookies) {
      const sessionToken = req.cookies[session.sessionName];
      if(sessionToken && session.validateSession(sessionToken)) {
        session.deleteSession(sessionToken);
        console.log("Logged Out Successfully");
      } else {
        console.log("Not Logged In, No Need For Logout");
      }
    } else {
      console.log("Not Logged In, No Need For Logout");
    }
    res.redirect('/');
  })

module.exports = router