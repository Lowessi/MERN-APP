const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    Requirements: {
      type: String,
      maxlength: 1000,
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

// Static method to post a new job
JobSchema.statics.JobPost = async function (
  userId,
  title,
  description,
  requirements,
  budget,
  deadline
) {
  const job = new this({
    UserId: userId,
    Title: title,
    Description: description,
    Requirements: requirements,
    Budget: budget,
    Deadline: deadline,
  });

  await job.save();
  return job;
};

// Static method to get all jobs (newest first)
JobSchema.statics.getAllJobs = async function () {
  return this.find().sort({ createdAt: -1 });
};

// Static method to search jobs by query
JobSchema.statics.searchJobs = async function (query) {
  return this.find({
    $or: [
      { Title: { $regex: query, $options: "i" } },
      { Description: { $regex: query, $options: "i" } },
      { Requirements: { $regex: query, $options: "i" } },
    ],
  }).sort({ createdAt: -1 });
};

module.exports = mongoose.model("JobModel", JobSchema);
