const mongoose = require('mongoose');
const { model } = require('./user');

const task = mongoose.model('task',{
  description:{
    type:String,
    trim:true,
  },
  completed:{
    type:Boolean,
    default:false,
  }
})

module.exports = task;