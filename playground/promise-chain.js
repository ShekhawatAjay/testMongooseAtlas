const connectDB = require('../DB/connection');
const task = require('../DB/task');

connectDB();

task.findByIdAndDelete('5f1e7eae7e69fa38fc9d3325').then((rlt)=>{
  console.log(rlt);
  return task.count({completed:false})
}).then((rlt1)=>{
  console.log(rlt1)
}).catch(err=>{
  console.log(err)
})