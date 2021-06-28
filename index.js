const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


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
app.use(authRoute);


app.get('/login',(req,res)=>{
  res.sendFile("login.html",{root : "./views"})
});
app.get('/register',(req,res)=>{
  res.sendFile("registration.html",{root : "./views"})
});


app.listen(8080 ,()=> console.log('Server is Running'))