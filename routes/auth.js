const router = require('express').Router();
const User = require('../model/User');

router.post('/register', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        console.error(err.message)
    }
});



module.exports=router;