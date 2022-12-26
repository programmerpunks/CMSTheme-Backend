const UserModel = require('../models/user.js')
// const UserModel = require('../models/user.js')
const dotenv = require ('dotenv')
const jwt = require ('jsonwebtoken')
dotenv.config()


const register = async (req, res) => {
  const { email } = req.body;
  try {
    if (await UserModel.findOne({ email: email }).exec()) {
      res.status(201).json({ message: false, error: 'Already Exists' });
    }
    else {
      let admin = await UserModel.create(req.body);
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
    let admin = await UserModel.findOne({ email: email })
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
          return res.status(201).json({ message: true, token, role: 'admin',admin });
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

const fetchUsers = async (req, res) => {
  try{
    const users = await UserModel.find()
    return res.status(201).json({ success: true, users })
  }catch (error) {
    return res.status(202).json({ success: false, error: error.message })
  }
}

const registerUser = async (req, res) => {
  try{
    let user = await UserModel.create(req.body.formData)
    return res.status(201).json({ success: true })
  }catch (error) {
    return res.status(202).json({ success: false, error: error.message })
  }
}

const deleteUser = async (req, res) => {
  try{
    await UserModel.deleteOne({_id: req.params.uid})
    return res.status(201).json({ success: true })
  }
  catch (error) {
  return res.status(202).json({ success: false, error: error.message })
}
}

module.exports = { register, login, registerUser, fetchUsers, deleteUser }