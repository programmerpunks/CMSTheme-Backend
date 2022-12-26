const express = require('express')
const jwt = require('jsonwebtoken')
const { register, login, registerUser, fetchUsers, deleteUser} = require('../controllers/admin')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/register-user', registerUser)
router.get('/fetch-users', fetchUsers)
router.get('/delete-user/:uid', deleteUser)


module.exports = router
