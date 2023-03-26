const express = require("express");
const {
  register,
  registerUser,
  fetchUsers,
  deleteUser,
} = require("../controllers/admin");
const router = express.Router();

router.post("/register", register);
router.post("/register-user", registerUser);
router.get("/fetch-users", fetchUsers);
router.get("/delete-user/:uid", deleteUser);

module.exports = router;
