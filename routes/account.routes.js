const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const accountController = require("../controllers/account.controller");
const router = express.Router();
router.post("/create", authenticateJWT, accountController.createAccount);

module.exports = router;
