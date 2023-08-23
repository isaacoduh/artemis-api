const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const accountController = require("../controllers/account.controller");
const paymentController = require("../controllers/payment.controller");
const { validateReq } = require("../middleware/validate");
const { createAccount } = require("../utils/validations/account.validation");
const router = express.Router();
router.post(
  "/create",
  authenticateJWT,
  validateReq(createAccount),
  accountController.createAccount
);
router.get("/my-accounts", authenticateJWT, accountController.getAllAccounts);
router.get("/my-accounts/:id", authenticateJWT, accountController.getAccount);
router.get(
  "/my-accounts/:id/account-history",
  authenticateJWT,
  accountController.getAccountHistory
);
// ======= Payment Tests

router.post("/accept-pay", authenticateJWT, paymentController.acceptPayment);
router.get("/payment/callback", paymentController.verifyPayment);
module.exports = router;
