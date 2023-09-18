const express = require("express");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.post(
  "/security-questions/create",
  adminController.createSecurityQuestion
);
router.get("/security-questions", adminController.getAllSecurityQuestions);
router.post(
  "/security-questions/bulk-create",
  adminController.bulkCreateSecurityQuestions
);
router.get("/users", adminController.getAllUsers);

module.exports = router;
