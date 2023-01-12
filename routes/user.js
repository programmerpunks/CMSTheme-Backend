const express = require('express')
const userValidation = require('../middleware/user_auth.js')
const auth = require('../middleware/auth.js')
const router = express.Router()
const { login } = require('../controllers/user.js')

router.post('/login', userValidation.validate('signin'), login)
router.use(auth.verifyToken)


module.exports = router