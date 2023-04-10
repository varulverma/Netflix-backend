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
  profiles: [{ profileId: String, name: String }],
  watchHistory: [
    {
      showId: String,
      series: [
        {
          seriesId: String,
          episodes: [
            {
              videoId: String,
              watchTime: Number,
            },
          ],
        },
      ],
    },
  ],
});

module.exports ={
    UserSchema
};