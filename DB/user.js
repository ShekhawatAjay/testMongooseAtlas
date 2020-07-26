const mongoose = require('mongoose');

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