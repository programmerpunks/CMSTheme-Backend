const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoutes = require('./src/routes/user.js')
const tweetRoutes = require('./src/routes/tweets.js')
require('./src/service/db')
require('dotenv').config()

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('Server listiening on port 8000')
})