const express = require('express')

const router = express.Router()

// Controllers Function
const { signUpUser, loginUser } = require('../controllers/userController')

// Login Route
router.post('/login', loginUser)

// Signup Route
router.post('/signup', signUpUser)

module.exports = router