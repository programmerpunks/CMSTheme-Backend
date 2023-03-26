const UserModel = require("../models/user.js");

const register = async (req, res) => {
  const { email } = req.body;
  try {
    if (await UserModel.findOne({ email: email }).exec()) {
      return res.status(400).json({ error: "Already Exists" });
    } else {
      let admin = await UserModel.create(req.body);
      return res.status(201).json({ message: true, admin });
    }
  } catch (err) {
    console.log("err: ", err.message);
  }
}

const fetchUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(202).json({ success: true, users });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const registerUser = async (req, res) => {
  try {
    let user = await UserModel.create(req.body.formData);
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.params.uid });
    return res.status(202).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { register, registerUser, fetchUsers, deleteUser };