const express = require("express");
const router = express.Router();

const { PostJob } = require("../Controllers/JobController");

router.post("/postjob", PostJob);

module.exports = router;
