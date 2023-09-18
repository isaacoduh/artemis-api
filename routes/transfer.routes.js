const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const { validateReq } = require("../middleware/validate");
const transferController = require("../controllers/transfer.controller");
const { sendToRequest } = require("../utils/validations/transfer.validation");
const router = express.Router();
router.post(
  "/send",
  authenticateJWT,
  validateReq(sendToRequest),
  transferController.sendTo
);

module.exports = router;
