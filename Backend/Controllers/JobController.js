const JobModel = require("../Models/JobModel");

const postJob = async (req, res) => {
  try {
    const { Title, Description, Requirements, Budget, Deadline } = req.body;
    const userId = req.user._id;

    const job = await JobModel.JobPost(
      userId,
      Title,
      Description,
      Requirements,
      Budget,
      Deadline
    );

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await JobModel.getJobById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await JobModel.searchJobs(query);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  searchJobs,
};
