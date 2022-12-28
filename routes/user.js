const express = require('express')
const userValidation = require('../middleware/user_auth.js')
const auth = require('../middleware/auth.js')
const router = express.Router()
const { login, CMS, fetchTemplate} = require('../controllers/user.js')

router.post('/login', userValidation.validate('signin'), login)
router.use(auth.verifyToken)
router.post('/cms/:tid', CMS)
router.post('/template', fetchTemplate)



module.exports = router