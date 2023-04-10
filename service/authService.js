const R = require("ramda");
const jwt = require("jsonwebtoken");
const UserAccessor = require("../accessor/userAccessor");
const SECRET_KEY = "varul12345";
const SessionAccessor = require("../accessor/sessionAccessor")

function login(email, password) {
  return UserAccessor.findByEmail(email).then((users) => {
    if (R.isNil(users) || users.length === 0) {
      return { statusCode: 401, message: "Invalid Email Address" };
    }
    let user = users[0];
    if (R.isNil(user.password) || user.password !== password) {
      return { statusCode: 401, message: "Invalid password" };
    }
    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      SECRET_KEY
    );
    return { statusCode: 200, token: token };
  });
}

function logout(userId) {
  SessionAccessor.getSessionByUserId(req.userId).then((sessions) => {
    return Promise.all(sessions.map((session) => session.remove()));
  });
}

module.exports = {
  login,
};
