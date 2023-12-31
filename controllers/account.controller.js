const catchAsync = require("../utils/request/catchAsync");
const accountService = require("../services/account.service");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");

const createAccount = catchAsync(async (req, res) => {
  const { currency } = req.body;
  const payload = await accountService.createAccount({
    currency,
    user_id: req.user.id,
  });
  return ApiResponder(res, httpStatus.CREATED, "Success", { ...payload });
});

const getAccount = catchAsync(async (req, res) => {
  const account = await accountService.getAccount({
    id: req.params.id,
    user_id: req.user.id,
  });
  return ApiResponder(res, httpStatus.OK, "Success", account);
});

const getAllAccounts = catchAsync(async (req, res) => {
  const accounts = await accountService.getAllAccounts(req.user.id);
  return ApiResponder(res, httpStatus.OK, "Success", { ...accounts });
});

const getAccountHistory = catchAsync(async (req, res) => {
  const accountHistory = await accountService.getAccountHistory(req.params.id);
  return ApiResponder(res, httpStatus.OK, "Success", { ...accountHistory });
});

const getLatestAccountHistory = catchAsync(async (req, res) => {
  const latest = await accountService.getLatestAccountHistory(req.user.id);
  return ApiResponder(res, httpStatus.OK, "Success", { ...latest });
});

const getAllAccountHistory = catchAsync(async (req, res) => {
  const latest = await accountService.getAllAccountHistory(req.user.id);
  return ApiResponder(res, httpStatus.OK, "Success", { ...latest });
});

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountHistory,
  getAccount,
  getLatestAccountHistory,
  getAllAccountHistory,
};
