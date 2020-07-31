const express = require('express');
const user = require('../../DB/user');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/users', async (req,res)=>{
  const newuser = new user(req.body);
try{
  const User  = await newuser.save()
  const token = await User.generateAuthToken();
  
        res.status(201).send({User,token})
   } catch(err){
   res.status(400).send(err);
     }
});
//////////////////////
router.get('/users/me',auth, async (req,res)=>{

  res.status(201).send(req.User)
// try{
// const User =await user.find({});
//       res.send(User);
// }catch(e){
//        res.status(500).send(e);
// }

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
})

//  user.findById(_id).then((reslut)=>{
//    if(!reslut){
//      return res.status(404).send();
//    }
//    res.status(200).send(reslut);
//  }).catch((e)=>{
//    res.status(500).send(e);
//  })
//////////////
router.patch('/users/me',auth,async (req,res)=>{
  const updates = Object.keys(req.body);
  const allowedUpdated = ['firstName','age','password','email'];
  // console.log(updates);
  const isValidUpdate = updates.every((update)=>allowedUpdated.includes(update));
  // console.log(isValidUpdate);
  if(!isValidUpdate){
    return res.status(400).send();
  }
  try{
  const User = req.User;
  updates.forEach((update)=>{ User[update]=req.body[update]; })
      await User.save();
      res.status(200).send(User);
      }   
      catch(e){
               res.status(402).send(e);
      }

})
///////////
router.delete('/users/me',auth, async (req,res)=>{
  try{
  //   const User = await user.findByIdAndDelete(req.User._id);
  //   if(!User){
  //     return res.status(404).send();
  //   }
  //   res.status(200).send(User);
   await req.User.remove();
   res.status(200).send(req.User);
  }catch(e){
res.status(500).send(e);
  }
})
////////

router.post('/users/login', async (req,res)=>{
  try{
    const User = await user.findByCredentials(req.body.email,req.body.password);
    const token = await User.generateAuthToken();
    res.status(202).send({User,token});
  }catch(e){
res.status(400).send(e)
  }
})

////
router.post('/users/logout',auth,async(req,res)=>{
  try{
    req.User.tokens = req.User.tokens.filter((i)=> {return i.token !== req.token });
    await req.User.save();
    res.status(200).send('LOGOUTED');
  }catch(e){
    res.status(500).send(e);
  }
})
/////
router.post('/users/logoutAll',auth,async(req,res)=>{
  try{
    req.User.tokens = [];
    await req.User.save();
    res.status(200).send('LOGOUTED');
  }catch(e){
    res.status(500).send(e);
  }
})

module.exports = router;
