const mongoose = require('mongoose');
const URL = 'mongodb+srv://Ajay123:Ajay@0000@mongodb1.t6vsr.mongodb.net/<dbname>?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(URL, {useUnifiedTopology: true , useNewUrlParser: true });
  console.log('coneected to atlas')
};

module.exports = connectDB;