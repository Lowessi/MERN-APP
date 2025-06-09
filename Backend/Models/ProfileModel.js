const mongoose = require("mongoose");

const WorkExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
});

const ProfileSchema = new mongoose.Schema(
  {
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

    // New photo URL field
    profilePhoto: { type: String, default: "" },
  },
  { timestamps: true }
);

ProfileSchema.statics.UpsertProfile = async function (userId, data) {
  const updated = await this.findOneAndUpdate(
    { userId },
    { $set: data },
    { upsert: true, new: true, runValidators: true }
  );
  return updated;
};

module.exports =
  mongoose.models.ProfileModel || mongoose.model("ProfileModel", ProfileSchema);
