const express = require('express');
const user = require('../../DB/user');
const router = new express.Router();

router.post('/users', async (req,res)=>{
  const newuser = new user(req.body);
try{
  await newuser.save()
        res.status(201).send(newuser)
   } catch(err){
   res.status(400).send(err);
     }
});
//////////////////////
router.get('/users', async (req,res)=>{

try{
const User =await user.find({});
      res.send(User);
}catch(e){
       res.status(500).send(e);
}

//   user.find({}).then((user1)=>{
// res.send(user1);
//   }).catch((e)=>{
//     res.status(500).send(e);
//   })
})
/////////////////////
router.get('/users/:id', async (req,res)=>{
 const _id=req.params.id;

 try{
   const User = await user.findById(_id);
   if(!User){
       return res.status(404).send();
       }
       res.status(200).send(User);
 }catch(e){
       res.status(500).send(e);
 }
//  user.findById(_id).then((reslut)=>{
//    if(!reslut){
//      return res.status(404).send();
//    }
//    res.status(200).send(reslut);
//  }).catch((e)=>{
//    res.status(500).send(e);
//  })
})
//////////////
router.patch('/users/:id',async (req,res)=>{
  try{
  const User = await user.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
  if(!User) {
    return res.status(404).send();
  }
  res.status(200).send(User);
  }catch(e){
     res.status(402).send(e);
  }

})
///////////
router.delete('/users/:id', async (req,res)=>{
  try{
    const User = await user.findByIdAndDelete(req.params.id);
    if(!User){
      return res.status(404).send();
    }
    res.status(200).send(User);

  }catch(e){
res.status(500).send(e);
  }
})

module.exports = router;
