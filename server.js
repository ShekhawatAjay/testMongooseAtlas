const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./DB/connection');
const app = express();
connectDB();
const Port = process.env.Port || 3000;

app.listen(Port,() => {
console.log('Server started');
});

const user = mongoose.model('user',{
  firstName:{
    type:String
  },
  age:{
    type:Number
  }
});
const me = new user({
  firstName:'ajay',
  age:23,
})

me.save().then((res)=>{
console.log('res',me);
}).catch((err)=>{
console.log('err',err);
});