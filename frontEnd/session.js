const cookie = require('cookie-session');
const uuid = require('uuid')

class Session {
  constructor(username, duration) {
      this.username = username;
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
}

const createSession = (uname, duration) => {
  // Create UID
  const sessionToken = uuid.v4();
  // Create New Session
  const session = new Session(uname, duration);
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

// this object stores the users sessions. For larger scale applications, you can use a database or cache for this purpose
const sessions = {}

module.exports.createSession = createSession;
module.exports.validateSession = validateSession;
module.exports.sessionName = "session_token";