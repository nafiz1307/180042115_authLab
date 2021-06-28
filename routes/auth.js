const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');



//Validation
const Joi = require('@hapi/joi');

const schema ={
    name : Joi.string().min(6).required(),
    email : Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid("male", "female").error(() => 'Gender should be Male (or) Female')
}

router.post('/register', async (req,res)=>{

    //Data Validation before user input
    const {error} = Joi.validate(req.body,schema);
    // res.send(error.details[0].message);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Hashing Passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password,salt);

    
    // //Create a new User
    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword,
    //     gender: req.body.gender
    // });
    // try{
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // }catch(err){
    //     console.error(err.message)
    // }
});

//Login Route

router.post('/login', async (req,res)=>{
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password')
    
})



module.exports=router;