const mongoose = require("mongoose");

const musicSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  music_id:{
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  comment:{
    type:String,
    required: true,
  },
  time:{
    type:String,
    required:true,
  }
});

const MusicModel = mongoose.model("musicRev", musicSchema);
module.exports = MusicModel;
