const connection = require('../database')
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
  connection.query(
    `SELECT * FROM users WHERE uname = '${uname}'`, 
    (err, results, fields) => {
        if (err) {
          console.log("Login Unsuccessful:" + err.stack);
          return;
        }
        
        if (results.length == 1 && results[0].pword == pswd) {
          console.log("Login Success");
          const sessionToken = session.createSession(uname, 10 * 60 * 1000);
          res.cookie(session.sessionName, sessionToken);
          res.redirect('/');
        } else {
          console.log("Invalid Credentials");
          res.status(401).send("Invalid Credentials");
        }
    })
}

module.exports = loginHandler
