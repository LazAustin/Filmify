const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//Register new user
//POST  /api/users
//Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    

    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please fill in all the fields')
    }
    
    //const lowerCaseEmail = email.toLowerCase()

    const userExists = await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})




//Authenticate a user
//POST  /api/users/login
//Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    //check email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {res.status(400)
    throw new Error('Invalid credentials')}

    res.json({message: 'Login User'})
})


//Get user data
//GET  /api/users/me
//Private
const getMe = asyncHandler(async (req, res) => {
    
    //const {_id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json(req.user)

})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {registerUser, loginUser, getMe}