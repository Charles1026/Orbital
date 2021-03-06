const cookie = require('cookie-session');
const uuid = require('uuid')
const database = require('./database');

class Session {
  constructor(id, username, email, pos, exp, duration) {
    this.id = id
    this.username = username;
    this.email = email;
    this.pos = pos;
    this.exp = exp;
    this.duration = duration;
    const now = new Date();
    this.expiresAt = new Date(now + duration);
  }

  // we'll use this method later to determine if the session has expired
  isExpired() {
    return this.expiresAt > (new Date());
  }

  refreshTime() {
    this.expiresAt = new Date(this.expiresAt + this.duration);
  }

  getInfo() {return [this.username, this.email, this.pos, this.exp];}

  getID() {return this.id}
}

const createSession = (sqlResult, duration) => {
  // Create UID
  const sessionToken = uuid.v4();
  // Create New Session
  const session = new Session(sqlResult[database.userID], sqlResult[database.userUName], sqlResult[database.userEmail], sqlResult[database.userPos], sqlResult[database.userExp], duration);
  // Add session to sessions
  sessions[sessionToken] = session;
  return sessionToken;
};

const validateSession = (sessionToken) => {
  userSession = sessions[sessionToken]
  if (userSession) {
    if (!userSession.isExpired()) {
      console.log("Cookie Validated");
      userSession.refreshTime();
      return true;
    }
    delete sessions[sessionToken];
  }
  return false;
}

const deleteSession = (sessionToken) => delete sessions[sessionToken];


const getInfo = (sessionToken) => {
  userSession = sessions[sessionToken];
  return userSession.getInfo();
}

// this object stores the users sessions. For larger scale applications, you can use a database or cache for this purpose
const sessions = {}

module.exports.createSession = createSession;
module.exports.validateSession = validateSession;
module.exports.sessionName = "session_token";
module.exports.deleteSession = deleteSession;
module.exports.getInfo = getInfo;