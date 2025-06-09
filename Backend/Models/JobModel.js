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
    Currency: {
      type: String,
      enum: ["USD", "PHP"],
      required: true,
      default: "USD",
    },
    Deadline: {
      type: Date,
      required: true,
    },

    ApplicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApplicationModel",
    },
  },
  { timestamps: true }
);

// Post a new job
JobSchema.statics.JobPost = async function (
  userId,
  title,
  description,
  requirements,
  budget,
  deadline,
  currency
) {
  const job = new this({
    UserId: userId,
    Title: title,
    Description: description,
    Requirements: requirements,
    Budget: budget,
    Deadline: deadline,
    Currency: currency,
  });
  await job.save();
  return job;
};

// Get all jobs (newest first with user info)
JobSchema.statics.getAllJobs = async function () {
  return this.find().populate("UserId", "Email").sort({ createdAt: -1 });
};

// Search jobs
JobSchema.statics.searchJobs = async function (query) {
  return this.find({
    $or: [
      { Title: { $regex: query, $options: "i" } },
      { Description: { $regex: query, $options: "i" } },
      { Requirements: { $regex: query, $options: "i" } },
    ],
  })
    .populate("UserId", "Email")
    .sort({ createdAt: -1 });
};

// Get job by ID
JobSchema.statics.getJobById = async function (id) {
  return this.findById(id).populate("UserId", "Email");
};

module.exports = mongoose.model("JobModel", JobSchema);
