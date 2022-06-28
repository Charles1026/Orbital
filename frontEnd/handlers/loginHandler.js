const database = require('../database')
const session = require('../session')

const loginHandler = (req, res) => {
  console.log("Incoming Login Post Request");
  if (req.cookies) {
    const sessionToken = req.cookies[session.sessionName];
    if (sessionToken && session.validateSession(sessionToken)) {
      console.log("Login Success");
      res.cookie(session.sessionName, sessionToken);
      res.redirect('/');
      return;
    }
  }
  
  const { uname, pswd } = req.body;
  console.log(req.body);
  database.connection.query(
    `SELECT * FROM ${database.userTable} WHERE ${database.userUname} = '${uname}'`, 
    (err, results, fields) => {
        if (err) {
          console.log("Login Unsuccessful:" + err.stack);
          return;
        }

        //query will return an array as username is unique and thus, we can use results[0] to access the only row given back from mySQL
        if (results.length == 1) { //Array has the only row needed
          console.log("Username Exists");
          console.log(results);
          accountPassword = results[0][database.userPWord];

          if (pswd == accountPassword) {
              console.log("Login Successsful");
              const sessionToken = session.createSession(uname, 10 * 60 * 1000);
              res.cookie(session.sessionName, sessionToken);
              res.redirect('/');
              return;
          }
            console.log("Invalid Password");
            res.status(401).send("Invalid Password");
            return;
        }
        console.log("Username Does Not Exist");
        res.status(401).send("User Not Found");

  })
}

module.exports = loginHandler
