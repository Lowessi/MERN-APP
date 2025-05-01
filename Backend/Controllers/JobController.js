// controllers/jobController.js
const JobModel = require("../Models/JobModel");

// POST /api/jobs/jobpost - Post a new job
const jobPost = async (req, res) => {
  try {
    const { Title, Description, Requirements, Budget, Deadline } = req.body;
    const userId = req.user._id; // Assumes requireAuth middleware sets req.user

    const job = await JobModel.JobPost(
      userId,
      Title,
      Description,
      Requirements,
      Budget,
      Deadline
    );

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/jobs - Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.getAllJobs();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

module.exports = {
  jobPost,
  getAllJobs,
};
