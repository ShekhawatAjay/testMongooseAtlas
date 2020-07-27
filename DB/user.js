const mongoose = require('mongoose');
const validator = require('validator');

const user = mongoose.model('guest',{
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)) throw new Error('not a valid email');
    }
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:7,
    validate(value){
      if(value.toLowerCase().includes('password')) throw new Error('plz remove password word')
    }
  },
  age:{
    type:Number,
    default:0,
    validate(value){
      if(value<0){
        throw new Error('Not a valid age');
      }
    }
  }
});

module.exports = user;