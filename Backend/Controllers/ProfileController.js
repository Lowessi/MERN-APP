const ProfileModel = require("../Models/ProfileModel");

const EditProfile = async (req, res) => {
  const userId = req.user._id; // assuming user is authenticated and user ID is in req.user
  const { name, address } = req.body;

  try {
    const profile = await ProfileModel.EditProfile(userId, name, address);

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { EditProfile };
