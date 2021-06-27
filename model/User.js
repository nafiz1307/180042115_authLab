const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        minimum : 6
    },
    email:{
        type : String,
        required: 'Email address is required',
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: 'Password is required',
        minimum : 6
    },
    gender:{
        type: String,
        enum: ["male", "female"]
    }
});

module.exports = mongoose.model('User',userSchema);