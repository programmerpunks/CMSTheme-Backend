const AdminModel = require('../models/admin.js')
const UserModel = require('../models/user.js')
// const UserModel = require('../models/user.js')
const dotenv = require ('dotenv')
const jwt = require ('jsonwebtoken')
dotenv.config()


const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await AdminModel.findOne({ email: email }).exec()) {
      res.status(201).json({ message: false, error: 'Already Exists' });
    }
    else {
      let admin = await AdminModel.create({ name, email, password });
      res.status(201).json({ message: true, admin });
    }
  }
  catch (err) {
    console.log('err: ',err.message)
  }
}


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await AdminModel.findOne({ email: email })
    if (!admin)
      return res.status(201).json({ message: false, error: 'User not found' })


    const validate = await admin.isValidPassword(password)
    if (!validate) {
      return res.status(201).json({ message: false, error: 'Wrong password' });
    }

    jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
      process.env.JWT_KEY,
      { expiresIn: "3h" },
      (err, token) => {
        try {
          return res.status(201).json({ message: true, token, admin });
        } catch (error) {
          return res.status(202).json({ message: false, error: error.message });
        }
      }
    )
  }
  catch (err) {
    console.log(err.message)
  }
}

const registerUser = async (req, res) => {
  const {firstName, lastName, email, password } = req.body

  let user = await UserModel.create({firstName, lastName, email, password})


}

module.exports = {register, login, registerUser}