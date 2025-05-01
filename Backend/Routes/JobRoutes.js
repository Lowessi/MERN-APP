// routes/jobRoutes.js
const express = require("express");
const router = express.Router();

const { jobPost, getAllJobs } = require("../Controllers/JobController");
const requireAuth = require("../middleware/ReqAuth");

// Route to post a new job (requires login)
router.post("/jobpost", requireAuth, jobPost);

// Route to get all jobs (publicly accessible)
router.get("/", getAllJobs);

module.exports = router;
