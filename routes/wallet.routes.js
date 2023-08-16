const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const walletController = require("../controllers/wallet.controller");
const router = express.Router();

router.post("/create", authenticateJWT, walletController.createWallet);
router.get("/my-wallets", authenticateJWT, walletController.getAllWallets);

module.exports = router;
