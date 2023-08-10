const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const accountController = require("../controllers/account.controller");
const paymentController = require("../controllers/payment.controller");
const router = express.Router();
router.post("/create", authenticateJWT, accountController.createAccount);
router.get("/my-accounts", authenticateJWT, accountController.getAllAccounts);
// ======= Payment Tests

router.post("/accept-pay", paymentController.acceptPayment);
router.get("/payment/callback", paymentController.verifyPayment);
module.exports = router;
