const ApplicationModel = require("../Models/ApplicationModel");
const JobModel = require("../Models/JobModel");
const mongoose = require("mongoose");

// Apply to a job
const applyToJob = async (req, res) => {
  try {
    const { jobId, proposal } = req.body;
    const userId = req.user._id;

    if (!jobId || !proposal) {
      return res
        .status(400)
        .json({ error: "Job ID and proposal are required." });
    }

    // Check if job exists
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }

    // Prevent duplicate applications by the same user
    const existingApp = await ApplicationModel.findOne({ jobId, userId });
    if (existingApp) {
      return res
        .status(400)
        .json({ error: "You have already applied to this job." });
    }

    // Save new application
    const newApplication = new ApplicationModel({ userId, jobId, proposal });
    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("applyToJob error:", error);
    res.status(500).json({ error: "Server error while applying to job." });
  }
};

// Get all applications for a specific job (for job owner)
const getApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: "Invalid Job ID." });
    }

    const applications = await ApplicationModel.find({ jobId }).populate(
      "userId",
      "Email"
    );
    res.status(200).json(applications);
  } catch (error) {
    console.error("getApplicationsByJobId error:", error);
    res.status(500).json({ error: "Failed to fetch applications." });
  }
};

// Get all applications by a user (for applicants)
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await ApplicationModel.find({ userId })
      .populate("jobId")
      .sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error("getMyApplications error:", error);
    res.status(500).json({ error: "Failed to fetch your applications." });
  }
};

module.exports = {
  applyToJob,
  getApplicationsByJobId,
  getMyApplications,
};
