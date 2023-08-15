const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const savingsController = require("../controllers/savings.controller");
const router = express.Router();

router.post("/create", authenticateJWT, savingsController.createSavingsPlan);
router.get(
  "/my-savings",
  authenticateJWT,
  savingsController.getAllSavingsPlans
);
router.get(
  "/my-savings/:id/details",
  authenticateJWT,
  savingsController.getSavingsPlanById
);
module.exports = router;
