const ProfileModel = require("../Models/ProfileModel");

// Create profile
const createProfile = async (req, res) => {
  const userId = req.user._id; // Assumes authentication middleware adds user
  const { name, location, title, skills, workExperience } = req.body;

  try {
    const profile = await ProfileModel.CreateProfile(userId, {
      name,
      location,
      title,
      skills,
      workExperience,
    });

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit profile
const editProfile = async (req, res) => {
  const userId = req.user._id;
  const updates = req.body;

  try {
    const profile = await ProfileModel.EditProfile(userId, updates);
    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get profile
const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await ProfileModel.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createProfile, editProfile, getMyProfile };
