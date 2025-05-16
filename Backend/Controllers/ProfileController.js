const ProfileModel = require("../Models/ProfileModel");
// import ProfileModel from "../Models/ProfileModel";

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

// Get your own profile
const getMyProfile = async (req, res) => {
  const userId = req.user._id;
  try {
    const profile = await ProfileModel.findOne({ userId })
      .populate("userId", "Email") // Ensure correct field name here
      .lean();

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Attach the email to the profile data
    res.status(200).json({
      ...profile, // Return the populated profile data
      email: profile.userId?.Email || "No email provided", // Check if Email is populated correctly
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get another user's profile by ID (for public display)
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    // Populate the user's email for the public profile
    const profile = await ProfileModel.findOne({ userId: id })
      .populate("userId", "Email") // Populate the Email field
      .lean();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  upsertProfile,
  getMyProfile,
  getProfileById,
};
