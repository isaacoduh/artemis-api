const express = require("express");
const profileController = require("../controllers/profile.controller");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();
router.post(
  "/security-question/create",
  authenticateJWT,
  profileController.createSecurityQuestion
);

router.post(
  "/security-questions/bulk-save",
  authenticateJWT,
  profileController.bulkSaveSecurityQuestions
);
module.exports = router;
