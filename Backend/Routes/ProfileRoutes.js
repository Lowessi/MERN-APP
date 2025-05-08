const express = require("express");
const router = express.Router();
const {
  createProfile,
  editProfile,
  getMyProfile,
} = require("../Controllers/ProfileController");
const requireAuth = require("../middleware/ReqAuth");

// Protect all profile routes
router.use(requireAuth);

router.post("/", createProfile); // Create profile
router.put("/", editProfile); // Edit profile
router.get("/", getMyProfile); // Get profile

module.exports = router;
