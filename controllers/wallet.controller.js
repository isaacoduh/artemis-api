const catchAsync = require("../utils/request/catchAsync");
const walletService = require("../services/wallet.service");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");

const createWallet = catchAsync(async (req, res) => {
  const { currency } = req.body;
  const payload = await walletService.createWallet({
    currency,
    user_id: req.user.id,
  });
  return ApiResponder(res, httpStatus.CREATED, "Success", { ...payload });
});

const getAllWallets = catchAsync(async (req, res) => {
  const wallets = await walletService.getAllWallets(req.user.id);
  return ApiResponder(res, httpStatus.OK, "Success", { ...wallets });
});

module.exports = { createWallet, getAllWallets };
