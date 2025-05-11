const express = require("express");
const router = express.Router();
const {
  upsertProfile,
  getMyProfile,
} = require("../Controllers/ProfileController");
const requireAuth = require("../middleware/ReqAuth");

router.use(requireAuth);

router.put("/", upsertProfile); // Create or edit profile
router.get("/", getMyProfile); // Get profile

module.exports = router;
