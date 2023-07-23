const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile:{
      type:String,
      required:true
    }
  })

const UserModel = mongoose.model('User', userSchema)
module.exports = (UserModel)