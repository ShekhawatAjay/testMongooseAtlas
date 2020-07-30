const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    unique:true,
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
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});
//////for login

UserSchema.statics.findByCredentials = async (email, password) =>{
   try{
     const User = await user.findOne({email});
   if(!User) throw new Error('login faild');

   const passwoedCorrect =await bcrypt.compare(password,User.password);

   if(!passwoedCorrect) throw new Error('login faild');

   return User;

   }catch(e){
    throw new Error('login faild');
   }
}
////////
UserSchema.methods.toJSON =function(){
  const user = this;
  const UserObject = user.toObject();
  delete UserObject.password;
  delete UserObject.tokens;
  return UserObject;
}
///////to token
UserSchema.methods.generateAuthToken = async function(){
  const user1 = this;
  const token = jwt.sign({_id : user1.id.toString()},'thisismytoken');
  // console.log(use);
  user1.tokens=user1.tokens.concat({token});
  user1.save();
  return token;
}

/////// for pswd
UserSchema.pre('save', async function(next){
  const user = this;
  this.age="56";
  // console.log(user.isModified('password'))
   if(user.isModified('password')){
    //  console.log('yes i am working');
     user.password = await bcrypt.hash(user.password,8);
    //  console.log(user.password);
   }
   next();
});
const user = mongoose.model('guest',UserSchema);

module.exports = user;