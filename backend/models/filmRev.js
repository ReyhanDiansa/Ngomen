const mongoose = require("mongoose");

const filmSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  rate: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const FilmModel = mongoose.model("FilmRev", filmSchema);
module.exports = FilmModel;
