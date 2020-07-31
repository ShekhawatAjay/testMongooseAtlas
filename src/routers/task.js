const express = require('express');
const task = require('../../DB/task');
const auth = require('../middleware/auth');

const router = new express.Router();


router.post('/task',auth,(req,res)=>{

  const newTask = new task({
    ...req.body,"owner":req.User._id});
  newTask.save().then(()=>{
    res.status(201).send(newTask)
console.log('res',newTask);
}).catch((err)=>{
  res.status(400).send(err);

console.log('err',err);
});
})

router.get('/task',auth,async(req,res)=>{
  try{
//  const Task=await task.find({owner:req.User._id})
 await req.User.populate('tasks').execPopulate();
  // populate('tasks').execPopulate();

    res.status(201).send(req.User.tasks);
  }catch(e){
    res.status(404).send(e);}
  })

router.get('/task/:id',auth,async (req,res)=>{
  const _id = req.params.id;
  try{
   const Task = await task.findOne({_id,owner:req.User._id});
   if(!Task){
    return res.status(404).send();
  }
  res.status(200).send(Task);
  }catch(e){
    res.status(404).send(e);

  }
  })
  ////
  router.patch('/task/:id', auth,async (req,res)=>{
const updates = Object.keys(req.body);
const allowedUpdate = ['description','completed'];
const isValidUpdate = updates.every((update)=> allowedUpdate.includes(update));
if(!isValidUpdate){
  return res.status(400).send();
}
    try{
      // const Task = await task.findById(req.params.id)
      const Task = await task.findOne({_id:req.params.id,owner:req.User._id});
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

  router.delete('/task/:id',auth, async (req,res)=>{

    try{
     const Task = await task.findOneAndDelete({_id:req.params.id,owner:req.User._id});
     if(!Task){
      return res.status(404).send();
    }
    res.status(200).send(Task);
    }catch(e){
      res.status(500).send(e);
    }
  })

  module.exports = router;
