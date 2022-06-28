

const getProfile = (req, res) => {
  console.log("Incoming Profile Get Request");
  if (!req.cookies) {
    res.redirect('/login');
  }
  const sessionToken = req.cookies[session.sessionName];
  if(!sessionToken || !session.validateSession(sessionToken)) {
    res.redirect('/login');
  }
}