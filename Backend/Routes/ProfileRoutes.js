const express = require("express");
const router = express.Router();

const { EditProfile } = require("../Controllers/ProfileController");

router.put("/editprofile", EditProfile);

module.exports = router;
