const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'invalid email'],
  },
  name: { type: String, required: true, minLength: 2 },
  password: {
    type: String,
    required: true,
    min: 8,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/,
      'Please enter a valid password. Total length 8. 1 capital, 1 small and 1 number atleast',
    ],
  },
  profile_image: {
    type: String
  },
  expires: {
    type: String
  }
})

AdminSchema.pre('save', async function (next) {
  const user = this
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
})

AdminSchema.methods.isValidPassword = async function (password) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}
const AdminModel = mongoose.model('user', AdminSchema, 'Users')

module.exports = AdminModel