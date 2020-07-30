const express = require('express');
const task = require('../../DB/task');

const router = new express.Router();


router.post('/task',(req,res)=>{
  const newTask = new task(req.body);
  newTask.save().then(()=>{
    res.status(201).send(newTask)
console.log('res',newTask);
}).catch((err)=>{
  res.status(400).send(err);

console.log('err',err);
});
})

router.get('/task',(req,res)=>{
  task.find({}).then((tsk)=>{
    res.status(201).send(tsk);
  }).catch((e)=>{
    res.status(404).send(e);
  })
})

router.get('/task/:id',async (req,res)=>{
  const _id = req.params.id;
  try{
   const Task = await task.findById(_id);
   if(!Task){
    return res.status(404).send();
  }
  res.status(200).send(Task);
  }catch(e){
    res.status(404).send(e);

  }
  })
  ////
  router.patch('/task/:id', async (req,res)=>{
const updates = Object.keys(req.body);
const allowedUpdate = ['description','completed'];
const isValidUpdate = updates.every((update)=> allowedUpdate.includes(update));
if(!isValidUpdate){
  return res.status(400).send();
}
    try{
      const Task = await task.findByIdAndUpdate(req.params.id)
      if(!Task){
        return res.status(404).send();
      }
      updates.forEach((update)=>{
        Task[update] = req.body[update];
      })
      await Task.save();
      res.status(200).send(Task);
}catch(e){
     res.status(404).send(e);
}

  })

  router.delete('/task/:id', async (req,res)=>{

    try{
     const Task = await task.findByIdAndDelete(req.params.id);
     if(!Task){
      return res.status(404).send();
    }
    res.status(200).send(Task);
    }catch(e){
      res.status(500).send(e);
    }
  })

  module.exports = router;
