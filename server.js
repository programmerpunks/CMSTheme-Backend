
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoutes = require('./routes/user.js')
const adminRoutes = require('./routes/admin.js')
require('dotenv').config()
require('./service/db')

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/admin', adminRoutes)
app.use('/users', userRoutes)



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server listiening on port 8000')
})

