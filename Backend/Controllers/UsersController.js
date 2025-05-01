const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const bcrypt = require("bcrypt");

// helper to create a JWT
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
    // Check if user exists
    const user = await UserModel.findOne({ Email: Email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.Email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { SignupUser, SigninUser };
