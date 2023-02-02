const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    firstname: { type: String, required: true, minLength: 2 },
    lastname: { type: String, required: true, minLength: 2 },
    password: {
      type: String,
      required: true,
      min: 8,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/,
        "Password should have 8 characters containg atleast 1 upper, 1 lower and 1 digit",
      ],
    },
    contact: {
      type: Number,
      required: true,
    },
    profile_image: {
      type: String,
    },
    expires: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  user.password = hash;
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};
module.exports = mongoose.model("users", UserSchema, "Users");
