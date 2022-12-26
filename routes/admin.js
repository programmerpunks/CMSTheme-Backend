const express = require('express')
const jwt = require('jsonwebtoken')
const { register, login, registerUser } = require('../controllers/admin')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/register-user', registerUser)

module.exports = router
