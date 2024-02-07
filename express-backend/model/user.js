const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  personId: {
    type: String, // Assuming personId is a string, you can adjust the type accordingly
    required: true,
    unique: true,
    
  },
  photo: {
    data: Buffer, // Binary data of the photo
    contentType: String,// Assuming the photo is stored as a URL or file path
    
  },
  text: {
    type:String,
  },
  password: {
    type: String,
    required: true,
  },
  friendList: {
    type: [String], // Assuming friendList is an array of personIds (strings), you can adjust the type accordingly
    default: [],
  },
});

const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
