const express = require('express')
const userValidation = require('../middleware/userAuth.js')
const auth = require('../middleware/auth.js')
const router = express.Router()
const { login, CMS, fetchTemplate, deleteImage} = require('../controllers/user.js')

router.post('/login', userValidation.validate('signin'), login)
router.use(auth.verifyToken)
router.post('/cms', CMS)
router.post('/template', fetchTemplate)
router.post('/delete-image', deleteImage)

module.exports = router