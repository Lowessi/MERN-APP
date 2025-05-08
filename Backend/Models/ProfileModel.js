const mongoose = require("mongoose");

const WorkExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
});

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  skills: { type: [String], required: true },
  workExperience: { type: [WorkExperienceSchema], default: [] },
});

// Static method to create profile
ProfileSchema.statics.CreateProfile = async function (userId, data) {
  const existing = await this.findOne({ userId });
  if (existing) {
    throw new Error("Profile already exists.");
  }
  const profile = await this.create({ userId, ...data });
  return profile;
};

// Static method to edit profile
ProfileSchema.statics.EditProfile = async function (userId, data) {
  const updated = await this.findOneAndUpdate({ userId }, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    throw new Error("Profile not found.");
  }
  return updated;
};

module.exports = mongoose.model("ProfileModel", ProfileSchema);
