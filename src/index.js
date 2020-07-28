const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../DB/connection');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task');
const app = express();
connectDB();
const Port = process.env.Port || 3000;

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(Port,() => {
console.log('Server started');
});

