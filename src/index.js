const express = require('express');
const mongoose = require('mongoose');
const user = require('../DB/user');
const task = require('../DB/task');
const connectDB = require('../DB/connection');
const app = express();
connectDB();
const Port = process.env.Port || 3000;

app.use(express.json());
app.post('/users',(req,res)=>{
  const newuser = new user(req.body);

  newuser.save().then(()=>{
    res.status(201).send(newuser)
console.log('res',newuser);
}).catch((err)=>{
  res.status(400).send(err);

console.log('err',err);
});
});

app.get('/users',(req,res)=>{
  user.find({}).then((user1)=>{
res.send(user1);
  }).catch((e)=>{
    res.status(500).send(e);
  })
})

app.get('/users/:id',(req,res)=>{
 const _id=req.params.id;
 user.findById(_id).then((reslut)=>{
   if(!reslut){
     return res.status(404).send();
   }
   res.status(200).send(reslut);
 }).catch((e)=>{
   res.status(500).send(e);
 })
})

app.post('/task',(req,res)=>{
  const newTask = new task(req.body);
  newTask.save().then(()=>{
    res.status(201).send(newTask)
console.log('res',newTask);
}).catch((err)=>{
  res.status(400).send(err);

console.log('err',err);
});
})

app.get('/task',(req,res)=>{
  task.find({}).then((tsk)=>{
    res.status(201).send(tsk);
  }).catch((e)=>{
    res.status(404).send(e);
  })
})

app.get('/task/:id',(req,res)=>{
  const _id = req.params.id;
  task.findById(_id).then((tsk)=>{
    res.status(201).send(tsk);
  }).catch((e)=>{
    res.status(404).send(e);
  })
  })

app.listen(Port,() => {
console.log('Server started');
});

// const me = new user({
//   firstName:'asssdvikash',
//   email:'Ajay@gmaIl.com  ',
//   password:'   h98passwoD ',
// })

// me.save().then((res)=>{
// console.log('res',me);
// }).catch((err)=>{
// console.log('err',err);
// });