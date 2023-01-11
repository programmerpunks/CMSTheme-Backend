const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid email'],
  },
  firstname: { type: String, required: true, minLength: 2,
    match: [
    /^[A-Za-z0-9 ]+$/,
    'Special characters not allowed',
  ],},
  lastname: { type: String, required: true, minLength: 2,
    match: [
      /^[A-Za-z0-9 ]+$/,
      'Special characters not allowed',
    ]},
  password: {
    type: String,
    required: true,
    min: 8,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/,
      'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case. And one digit',
    ],
  },
  profile_image: {
    type: String,
    match: [
      /^[A-Za-z0-9 ]+$/,
      'Special characters not allowed',
    ],
    
  },
  expires: {
    type: String,
    match: [
      /^[A-Za-z0-9 ]+$/,
      'Special characters not allowed',
    ],
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