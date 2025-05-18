// routes/JobRoutes.js
const express = require("express");
const requireAuth = require("../middleware/ReqAuth");
const {
  postJob,
  getAllJobs,
  getJobById,
  searchJobs,
} = require("../Controllers/JobController");

const router = express.Router();

router.use(requireAuth);

router.post("/jobpost", postJob);
router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.get("/:id", getJobById);

module.exports = router;
