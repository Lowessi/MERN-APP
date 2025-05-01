const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // This references the User model
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
      maxlength: 2000, // Optional: Add character limit for description
    },
    Requirements: {
      type: String,
      maxlength: 1000, // Optional: Limit for requirements
    },
    Budget: {
      type: Number,
      required: true,
    },
    Deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

JobSchema.statics.JobPost = async function (
  userId,
  title,
  description,
  requirements,
  budget,
  deadline
) {
  const job = new this({
    UserId: userId, // Make sure this is the correct field to store the user ID
    Title: title,
    Description: description,
    Requirements: requirements,
    Budget: budget,
    Deadline: deadline,
  });

  await job.save();
  return job; // Return the job object after saving
};
JobSchema.statics.getAllJobs = async function () {
  return this.find().sort({ createdAt: -1 });
};

module.exports = mongoose.model("JobModel", JobSchema);
