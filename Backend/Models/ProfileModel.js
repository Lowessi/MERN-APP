const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create or update profile
ProfileSchema.statics.EditProfile = async function (userId, name, address) {
  const existing = await this.findOne({ userId });

  if (existing) {
    existing.name = name;
    existing.address = address;
    return await existing.save();
  } else {
    return await this.create({ userId, name, address });
  }
};

module.exports = mongoose.model("ProfileModel", ProfileSchema);
