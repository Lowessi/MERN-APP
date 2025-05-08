const express = require("express");
const router = express.Router();

const {
  jobPost,
  getAllJobs,
  searchJobs, // <-- Add search controller
} = require("../Controllers/JobController");

const requireAuth = require("../middleware/ReqAuth");

// Route to post a new job (requires login)
router.post("/jobpost", requireAuth, jobPost);

// Route to get all jobs (publicly accessible)
router.get("/", getAllJobs);

// Route to search jobs by query (publicly accessible)
router.get("/search", searchJobs); // <-- New route

module.exports = router;
