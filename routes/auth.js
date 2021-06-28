const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {loginValidation, registrationValidation}= require('./validation');





//Registration route
router.post('/register', async (req,res)=>{

    // //Data Validation before user input
    // const {error} = Joi.validate(req.body,schema);
    // // res.send(error.details[0].message);
    const {error}= registrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking User Duplication
    const userExist = await User.findOne({email : req.body.email});
    if(userExist) return res.status(400).send('User Email already exists!')
    
    // Hashing Passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    
    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender
    });
    try{
        const savedUser = await user.save();
        console.log(`${user.name} successfully registered`)
        res.sendFile("login-v2.html",{root : "./views"})

    }catch(err){
        console.error(err.message)
    }
});

//Login Route

router.post('/login', async (req,res)=>{
    //Data Validation before user Input
    const {error}= loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if User exists
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email does not exist!');
    //Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send ('Email and Password do not match!')

    // //Creating and Assigning token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('authorization-token',token).send(token);
    

    res.sendFile("index.html",{root : "./views"})
    console.log(`${user.name} logged in`)
})



module.exports=router;