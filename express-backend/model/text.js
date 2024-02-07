const mongoose = require('mongoose');


const textSchema = new mongoose.Schema({
  
    text: {
      type:String,
    },
    
  });
  
const TextModel = mongoose.model('Text', textSchema);
  

module.exports = TextModel;