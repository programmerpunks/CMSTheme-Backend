const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const CustomStrategy = require('passport-custom').Strategy
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.js')
const nodemailer = require('nodemailer')

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {

      const { firstName, lastName, profile_image } = req.body
      try {
        let user;
        user = await UserModel.findOne({ email })
        if (user) {
          return done(null, false, { message: 'User already exists with this email' })
        }
        user = await UserModel.create({ firstName, lastName, profile_image, email, password, profile_image })
        return done(null, user, { message: 'User created' })
      } catch (error) {
        done(error.message)
      }
    }
  )
)

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'User not found' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' })
        }

        return done(null, user, { message: 'Logged in Successfully' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  'forgotpassword',
  new CustomStrategy(async (req, done) => {
    const email = req.body.email
    try {
      const user = await UserModel.findOne({ email })

      if (!user) {
        return done(null, false, { message: 'Such user does not exists' })
      }
      var transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        },

      });
      const expire = Date.now() + 3600000;
      const resetCode = 1 + Math.floor(Math.random() * 10000);

      var mailOptions = {
        from: {
          name: 'CMS',
          address: process.env.EMAIL
        },
        to: user.email,
        subject: "Reset password link",

        html: `<h1>You requested for password reset </h1><p>\
                If you have requested to reset your password then use the code below to reset password for your account<br/>\
                <h1>${resetCode}</h1><br/>\
                This code will expire within 1 hour.<br/>\
    </p>`
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return done(null, false, { message: error.message })
        } else {
          await UserModel.findByIdAndUpdate(user._id, { expires: expire }, { new: true });
          return done(null, user, { message: "Check your email", resetCode: resetCode })
        }
      });

    } catch (err) {
      return done(null, false, { message: err.message })
    }
  }
  ))

exports.verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization
  try {
    let token = authHeader.split(' ')[1];
    let verified = jwt.verify(token, process.env.SECTER_KEY, (err, verifiedJwt) => {
      if (err) {
        return false
      } else {
        return (verifiedJwt)
      }
    })
    req.verified = verified
    next()
  } catch (err) {
    let error = new Error('You need to login first.')
    res.status(202).json({ status: false, error: error.message })
  }
}

