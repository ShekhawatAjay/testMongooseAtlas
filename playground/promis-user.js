const connectDB = require('../DB/connection');
const user = require('../DB/user');

connectDB();

const updateAgeById = async (id,age) => {
  const User = await user.findByIdAndUpdate(id,{age});
  const count = await user.countDocuments({age});
  return count;
}

updateAgeById('5f1e73233c3524313c872298',25).then((c)=>{
  console.log(c);
}).catch((e)=>{
  console.log(e);
});