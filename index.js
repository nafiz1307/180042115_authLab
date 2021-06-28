const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to Database
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DBCONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connection Established with database successfully");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
connectDB();

//Middlewares
app.use(express.json());


//Routes Middlewares
app.use('/user',authRoute);

app.listen(8080 ,()=> console.log('Server is Running'))