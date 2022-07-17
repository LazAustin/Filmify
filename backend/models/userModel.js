const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add your name'],
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please add your email'],
    },
    password: {
        type: String,
        required: [true, 'Please add a production company'],
    },
},    
{ 
    timestamps: true 
})
    
module.exports = mongoose.model('User', userSchema)