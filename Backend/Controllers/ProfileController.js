// profileController.js
const ProfileModel = require("../models/ProfileModel");

const upsertProfile = async (req, res) => {
  const userId = req.user._id;
  const { name, location, title, skills, workExperience, profilePhoto } =
    req.body;

  try {
    const profile = await ProfileModel.UpsertProfile(userId, {
      name,
      location,
      title,
      skills,
      workExperience,
      profilePhoto, // <-- added profilePhoto
    });
    res.status(200).json({ message: "Profile saved successfully", profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await ProfileModel.findOne({ userId })
      .populate("userId", "Email")
      .lean();

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({
      ...profile,
      email: profile.userId?.Email || profile.userId?.email,
      profilePhoto: profile.profilePhoto || "",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.params.id })
      .populate("userId", "Email")
      .lean();

    if (!profile) return res.status(404).json({ error: "Profile not found" });

    res.status(200).json({
      ...profile,
      email: profile.userId?.Email || profile.userId?.email,
      profilePhoto: profile.profilePhoto || "",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  upsertProfile,
  getMyProfile,
  getProfileById,
};
