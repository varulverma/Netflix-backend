const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  phone: String,
  password: String,
  isEmailVerified: Boolean,
  isPhoneNoVerified: Boolean,
  creationDate: Date,
  role: String,
  state: String,
});

module.exports ={
    UserSchema
};