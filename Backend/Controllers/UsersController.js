const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const bcrypt = require("bcrypt");
const ProfileModel = require("../Models/ProfileModel");
const { get } = require("mongoose");

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

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(query, "i");

    // Step 1: Find users by email matching
    const users = await UserModel.find({ Email: { $regex: regex } });

    // Step 2: Join with profile data
    const results = await Promise.all(
      users.map(async (user) => {
        const profile = await ProfileModel.findOne({ userId: user._id });

        return {
          _id: user._id,
          Email: user.Email,
          name: profile?.name || null,
          address: profile?.location || null,
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    console.error("Search failed:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Populate the user's email for the public profile
    const user = await UserModel.findOne({ _id: id });
    // .populate("_id", "Email") // Populate the Email field
    // .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { SignupUser, SigninUser, searchUsers, getUserById };
