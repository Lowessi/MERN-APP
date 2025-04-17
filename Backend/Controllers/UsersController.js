const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

// Signup user
const SignupUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.SignupUser(Email, Password);
    const token = createToken(user._id);

    res.status(200).json({ Email: user.Email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signin user
const SigninUser = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await UserModel.SigninUser(Email, Password);
    const token = createToken(user._id);

    res.status(200).json({ Email: user.Email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { SignupUser, SigninUser };
