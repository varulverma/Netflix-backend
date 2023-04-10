const {v4: uuidv4} = require('uuid');
const UserAccessor = require("../accessor/userAccessor");
const State = require('../db/constants/state')
const Role = require('../db/constants/roles')
const R = require('ramda');

function addNewUser(user) {
  return UserAccesor.addNewUser({
    ...user,
    userId: uuidv4(),
    isEmailVerified: false,
    isphoneNoVerified: false,
    role: Roles.ROLE_USER,
    state: state.Active,
    profiles: [],
  });
}

function addNewProfile(userId, name) {
  return UserAccesor.findByUserId(userId)
    .then((user) => user[0])
    .then((user) => {
      if (!R.isNil(user)) {
        if (R.isNil(user.profiles)) {
          user.profiles = [];
        }
        user.profiles.push({ profileId: uuidv4(), name });
        return UserAccesor.updateUser(user);
      }
    });
}

function updateWatchHistory(userId, showId, seriesId, videoId, watchTime) {
  return UserAccesor.findByUserId(userId)
    .then((users) => users[0])
    .then((user) => {
      if (!R.isNil(user)) {
        let watchHistory = R.propOr([], "watchHistory")(user);
        let currentShow = watchHistory.find((show) => show.showId === showId);
        if (R.isNil(currentShow)) {
          currentShow = {
            showId,
            series: [
              {
                seriesId,
                episodes: [
                  {
                    videoId,
                    watchTime,
                  },
                ],
              },
            ],
          };
          watchHistory.push(currentShow);
        } else {
          let currentSeries = currentShow.series.find(
            (series) => series.seriesId === seriesId
          );
          if (R.isNil(currentSeries)) {
            currentSeries = {
              seriesId,
              episodes: [
                {
                  videoId,
                  watchTime,
                },
              ],
            };
            currentShow.push(currentSeries);
          } else {
            let currentVideo = currentSeries.episodes.find(
              (video) => video.videoId === videoId
            );
            let newVideo = {
              videoId,
              watchTime,
            };
            if (R.isNil(currentVideo)) {
              currentSeries.episodes.push(newVideo);
            } else {
              currentVideo.watchTime = watchTime;
            }
          }
        }
      }
      return user;
    })
    .then((updatedUser) => UserAccesor.updateUser(updatedUser));
}

function getWatchHistory(showId, seriesId, videoId) {
  return UserAccessor.findByUserId(userId)
    .then((users) => users[0])
    .then((user) => {
      if (!R.isNil(user)) {
        let watchHistory = R.propOr([], "watchHistory")(user);
        let currentShow = watchHistory.find((show) => show.showId === showId);
        let defaultReturnValue = { watchTime: 0 };
        if (R.isNil(currentShow)) {
          return defaultReturnValue;
        }
        let currentSeries = currentShow.series.find(
          (series) => series.seriesId === seriesId
        );
        if (R.isNil(currentSeries)) {
          return defaultReturnValue;
        }
        let currentVideo = currentSeries.episodes.find(
          (video) => video.videoId === videoId
        );
        if (R.isNil(currentVideo)) {
          return defaultReturnValue;
        }
        return currentVideo;
      } else {
        return {
          watchTime: 0,
        };
      }
    });
}

module.exports = {
  addNewUser,
  addNewProfile,
  updateWatchHistory,
  getWatchHistory,
};