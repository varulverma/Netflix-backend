const mongoose = require("mongoose");
const Showschema = require("../schema/showSchema").Showschema;

const Shows = mongoose.model(`shows`, Showschema);

module.exports = {
  Shows,
}