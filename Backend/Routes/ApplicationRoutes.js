const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getApplicationsByJobId,
  getMyApplications,
} = require("../Controllers/ApplicationController");

// Middleware: Require login/auth
const requireAuth = require("../middleware/ReqAuth");

router.use(requireAuth);

// POST: Apply to a job
router.post("/apply", applyToJob);

// GET: All applications to a specific job (for job owner)
router.get("/job/:jobId", getApplicationsByJobId);

// GET: All applications made by the logged-in user
router.get("/my", getMyApplications);

module.exports = router;
