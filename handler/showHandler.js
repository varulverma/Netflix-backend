const R = require("ramda");
const ShowService = require("../service/showService");

function getShowById(req, res) {
  const showId = req.params.showId;
  if (R.isNil(showId)) {
    res.status(400).send({ errorCode: "SHOW_ID_NOT_EXISTS" });
  }
  ShowService.findByShowId(showId).then((show) => {
    if (R.isNil(show)) {
      res.status(200).send(show);
    } else {
      res.status(400).send({ errorCode: "INVALID_SHOW_ID" });
    }
  });
}

function findSeriesByKey(req, res) {
  const showId = req.params.showId;
  const seriesId = req.params.seriesId;
  if (R.isNil(showId) || R.isNil(seriesId)) {
    res.status(400).send({ erroeCode: "Params_NULL" });
  }
  ShowService.findSeriesByKey(showId, seriesId).then((series) => {
    if (!R.isNil(series)) {
      res.status(200).send(series);
    } else {
      res.status(400).send({ erroCode: "Invalid_show_enter" });
    }
  });
}

function findvideoLink(req, res) {
  const showId = req.params.showId;
  const seriesId = req.params.seriesId;
  const videoId = req.params.videoId;
  if (R.isNil(showId) || R.isNil(seriesId) || R.isNil(videoId)) {
    res.status(400).send({ errorCode: "PARAMS_NULL" });
  }
  ShowService.findVideoLink(showId, seriesId, videoId).then((video) => {
    if (!R.isNil(video)) {
      res.status(200).send(video);
    } else {
      res.status(400).send({ erroeCode: "Invaild_show_ID" });
    }
  });
}

module.exports = {
  getShowById,
  findSeriesByKey,
  findvideoLink, 
};
