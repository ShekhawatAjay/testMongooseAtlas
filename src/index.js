const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../DB/connection');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task');
const app = express();
connectDB();
const Port = process.env.Port || 3000;

// app.use((req,res,next)=>{
//   // if(req.method==='GET'){
//   //   res.send('get request disabled');
//   // }else{
//   //   next();
//   // }
//   res.send('We are in maintinance mode');
// })
app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(Port,() => {
console.log('Server started');
});



// const jwt = require('jsonwebtoken');

// const myfunction = async () =>{
// const token = jwt.sign({_id:'user123'},'thisismytoken',{expiresIn:'7 days'})
// console.log(token);
// const verifyJWT = jwt.verify(token,'thisismytoken');
// console.log(verifyJWT);
// }
// myfunction();
