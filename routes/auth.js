const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {loginValidation, registrationValidation}= require('./validation');




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
        res.send(savedUser);
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
    

    res.send("Logged In!")
})



module.exports=router;