const express = require("express");
const requireAuth = require("../middleware/ReqAuth");
const {
  postJob,
  getAllJobs,
  getJobById,
  searchJobs,
  getMyJobs,
  deleteJob,
  updateJob,
} = require("../Controllers/JobController");

const router = express.Router();

router.use(requireAuth);

router.post("/jobpost", postJob);
router.get("/my", getMyJobs);
router.get("/search", searchJobs);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);

module.exports = router;
