const {v4: uuidv4} = require('uuid');
const UserAccessor = require("../accessor/userAccessor");
const State = require('../db/constants/state')
const Role = require('../db/constants/roles')

function addNewUser(user) {
  return UserAccessor.addNewUser({
    ...user,
    userId: uuidv4(),
    isEmailVerified: false,
    isPhoneNoVerified: false,
    role: Role.ROLE_USER,
    state: State.Activated
  });
}

module.exports = {
  addNewUser,
};
