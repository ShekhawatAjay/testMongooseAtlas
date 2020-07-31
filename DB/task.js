const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description:{
    type:String,
    trim:true,
  },
  completed:{
    type:Boolean,
    default:false,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'user'
  
  }
},{
  timestamps:true,
})
const task = mongoose.model('task',TaskSchema)

module.exports = task;