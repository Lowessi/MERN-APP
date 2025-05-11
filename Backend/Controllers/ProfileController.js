const ProfileModel = require("../Models/ProfileModel");

// Create or update profile
const upsertProfile = async (req, res) => {
  const userId = req.user._id;
  const { name, location, title, skills, workExperience } = req.body;

  try {
    const profile = await ProfileModel.UpsertProfile(userId, {
      name,
      location,
      title,
      skills,
      workExperience,
    });
    res.status(200).json({ message: "Profile saved successfully", profile });
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

module.exports = { upsertProfile, getMyProfile };
