const mongoose = require("mongoose");
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
    console.error("postJob error:", error);
    res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("getAllJobs error:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Job ID" });
    }
    const job = await JobModel.getJobById(id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    console.error("getJobById error:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await JobModel.searchJobs(query);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("searchJobs error:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await JobModel.find({ UserId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("getMyJobs error:", error);
    res.status(500).json({ error: "Failed to fetch your jobs" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await JobModel.findOneAndDelete({
      _id: req.params.id,
      UserId: req.user._id,
    });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    console.error("deleteJob error:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Job ID" });
    }

    const updatedJob = await JobModel.findOneAndUpdate(
      { _id: id, UserId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("updateJob error:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getJobById,
  searchJobs,
  getMyJobs,
  deleteJob,
  updateJob,
};
