const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  // status: {
  //   type: Number,
  //   // enum: [0, 1, 5], // Generally, i tend to follow this practices-   0=>inactive, 1=>active, 5=>deleted, can be deleted permanently after a certain time period
  //   enum: [0, 1], //For the time being taking - 1=>active, 0=>deleted, can be deleted permanently after a certain time period
  //   // required: true,   
  //   default: 1        
  // },

});

module.exports = mongoose.model('User', userSchema);
