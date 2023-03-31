const mongoose = require('mongoose');
const { UserSchema } = require('../schema/userSchema');
const SessionSchema = require('../schema/sessionSchema').SessionSchema;

const Sessions = mongoose.model('sessions', SessionSchema);

module.exports ={
    Sessions
}