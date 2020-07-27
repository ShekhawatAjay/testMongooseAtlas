const express = require('express');
const mongoose = require('mongoose');
const user = require('./DB/user');
const connectDB = require('./DB/connection');
const app = express();
connectDB();
const Port = process.env.Port || 3000;

app.listen(Port,() => {
console.log('Server started');
});

const me = new user({
  firstName:'asssdvikash',
  email:'Ajay@gmaIl.com  ',
  password:'   h98passwoD ',
})

me.save().then((res)=>{
console.log('res',me);
}).catch((err)=>{
console.log('err',err);
});