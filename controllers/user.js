const passport = require('passport')
const jwt = require('jsonwebtoken')
require('../middleware/auth.js')

const login = async (req, res, next) => {
  passport.authenticate('login', { session: false }, async (err, user, messages) => {
    try {
      if (err || !user) {
        const error = new Error(messages.message)
        let errors = []
        errors.push(error.message)
        return res.status(202).json({ status: false, errors })
      }
      const body = { _id: user._id, email: user.email }
      const token = jwt.sign({ user: body }, process.env.SECTER_KEY)
      return res.status(202).json({ token, user })

    } catch (error) {
      return next(error)
    }
  })(req, res, next);
}


module.exports = {login}
