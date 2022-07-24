const express = require("express");
const router = express.Router();
const session = require('../session');
const path = require("path");
const dbConnection = require("../database");
const bodyParser = require('body-parser');
const { userInfo } = require("os");

router.use(bodyParser.urlencoded({ extended: true }))

router
  .route("/")
  //Getting the personal particulars
  .get((req, res) => {
    console.log("Incoming Profile Get Request");
    if (!req.cookies) {
      res.redirect('/login');
      return;
    }
    const sessionToken = req.cookies[session.sessionName];
    if(!sessionToken || !session.validateSession(sessionToken)) {
      res.redirect('/login');
      return;
    }

    let userInfo = session.getInfo(sessionToken);
    res.render("profile", {uname: userInfo[0], email: userInfo[1], pos: userInfo[2], exp: userInfo[3]});
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
          
          console.log("Account Updated"); 
          res.status(204).send('Successfully Updated');
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

  dbConnection.connection.query(
    `SELECT ${dbConnection.userUName}, ${dbConnection.userPos}, ${dbConnection.userExp} 
      FROM ${dbConnection.userTable} 
      WHERE ${dbConnection.userUName} = '${UName}'`,
    (err, results, fields) => {
      if (err) {
        console.log("Account Retrieval Unsuccessful:" + err.stack);
        return;
      }

      // query will return an array as username is unique and thus, we can use results[0] to access the only row given back from mySQL
      if (results.length == 1) { // Array has the only row needed
        console.log("Account Exists");
        account = results[0];
        
        console.log(account);
        
        res.send('Test susccessful');
        // res.sendFile(path.join(__dirname, "../html/", "profile.html")); probably need to change the path to a different html
        return;
      }

      console.log("Invalid Username");
      res.status(401).send("Invalid Username");
      return;
    }
  )
})

module.exports = router;