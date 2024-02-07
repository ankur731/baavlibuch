const mongoose = require('mongoose');


const countSchema = new mongoose.Schema({
  
    count: {
      type:Number,
    },
    
  });
  
const CountModel = mongoose.model('Count', countSchema);
  

module.exports = CountModel;