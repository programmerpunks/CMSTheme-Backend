const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, required: true, minLength: 2 },
  password: {
    type: String,
    required: true,
    min: 8,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/,
      'Please enter a valid password',
    ],
  },
  profile_image: {
    type: String
  },
  expires: {
    type: String
  }

})

UserSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}
const UserModel = mongoose.model('users', UserSchema, 'Users')

module.exports = UserModel