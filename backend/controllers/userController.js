const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// _id is part of the payload
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // Create Token
        const token = createToken(user._id)

        res.status(200).json({email, token}) // Pass the token back to browser 
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup User
const signUpUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // Create Token
        const token = createToken(user._id)

        res.status(200).json({email, token}) // Pass the token back to browser
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, signUpUser }


/* JSON Web Tokens
Header - Contains the algorithm used for the JWT
Payload - Contains non-sensitive user data
Signature - Used to verify the token by the server */
