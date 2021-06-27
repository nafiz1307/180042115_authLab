const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Connect to Database
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://nafiz:nafiz@cluster0.gq5sd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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

//Import Routes
const authRoute = require('./routes/auth');

//Routes Middlewares
app.use(authRoute);

app.listen(8080 ,()=> console.log('Server is Running'))