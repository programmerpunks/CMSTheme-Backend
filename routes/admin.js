const express = require('express')
const jwt = require('jsonwebtoken')
const { login, registerUser } = require('../controllers/admin')
const router = express.Router()

router.post('/login', login)
router.post('/register-user', registerUser)

module.exports = router
