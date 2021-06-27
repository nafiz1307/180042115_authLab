const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res)=>{
    
    //Hashing Passwords
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
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password')
    
})



module.exports=router;