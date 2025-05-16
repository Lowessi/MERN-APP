const express = require("express");
const router = express.Router();
const {
  upsertProfile,
  getMyProfile,
  getProfileById,
} = require("../Controllers/ProfileController");
const requireAuth = require("../middleware/ReqAuth");

router.use(requireAuth);

router.put("/me", upsertProfile); // PUT /api/profile/me
router.get("/me", getMyProfile); // GET /api/profile/me
router.get("/:id", getProfileById); // GET /api/profile/:id

module.exports = router;
