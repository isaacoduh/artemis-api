const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const savingsController = require("../controllers/savings.controller");
const router = express.Router();

router.post("/create", authenticateJWT, savingsController.createSavingsPlan);

module.exports = router;
