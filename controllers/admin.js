const UserModel = require('../models/user.js')
const dotenv = require ('dotenv')
const jwt = require ('jsonwebtoken')
dotenv.config()

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
    return res.status(201).json({ message: false, error: err.message });
    
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
  const {firstname, lastname, email, password } = req.body
  try{
    let user = await UserModel.findOne({email})

    if(user){
    return res.status(201).json({ message: false, error: 'User already exists' });
  }

    await UserModel.create({firstname, lastname, email, password})
    return res.status(201).json({ message: true });
  }
  catch (err) {
    return res.status(201).json({ message: false, error: err.message });
    
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

module.exports = { login, registerUser, fetchUsers, deleteUser }