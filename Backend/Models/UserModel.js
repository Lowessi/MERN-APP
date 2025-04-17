const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const SECRET = process.env.SECRET;

const UserSchema = new Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },

    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method

UserSchema.statics.SignupUser = async function (Email, Password) {
  const exist = await this.findOne({ Email });
  if (exist) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(Password, salt);

  const User = await this.create({ Email, Password: hashed });
  return User;
};

//static Signin method

UserSchema.statics.SigninUser = async function (Email, Password) {
  const User = await this.findOne({ Email });

  if (!User) {
    throw Error("Email does not exist");
  }

  const match = await bcrypt.compare(Password, User.Password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return User;
};

module.exports = mongoose.model("UserModel", UserSchema);
