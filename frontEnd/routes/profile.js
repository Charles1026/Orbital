const express = require("express");
const router = express.Router();
const session = require('../session');
const path = require("path");
const dbConnection = require("../database");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))

router
  .route("/")
  //Getting the personal particulars
  .get((req, res) => {
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
    // console.log("Incoming Request to Update Profile");
    // if (!req.cookies) {
    //   res.redirect('/login');
    // }
    // const sessionToken = req.cookies[session.sessionName];
    // if(!sessionToken || !session.validateSession(sessionToken)) {
    //   res.redirect('/login');
    // }

    const {uname, email, pos, exp} = req.body;

    dbConnection.connection.query(
      `UPDATE ${dbConnection.userTable} 
        SET ${dbConnection.userEmail} = '${email}', 
            ${dbConnection.userPos} = '${pos}', 
            ${dbConnection.userExp} = '${exp}' 
        WHERE ${dbConnection.userUName} = '${uname}'` , 
      (err, results, fields) => {
          if (err) {
              console.log("Account Update Unsuccessful");

              return console.log(err); 
          }
          
          console.log("Account Updated"); // Currently updates fine but has an error saying "can't set headers after they are sent"
          res.redirect('/profile');
          // Also need to work on updating the cookie session to reflect the changes in the database (currently only updates cookies on login)
      })
  })
  //Deleting personal particulars
  .delete((req, res) => {
    console.log("Incoming Request to Delete Profile");
    res.send("testing");
  })

router.get('/:UName', (req, res) => {
  const { UName } = req.params;

  dbConnection.connection.query
})
module.exports = router;