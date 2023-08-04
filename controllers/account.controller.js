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

module.exports = { createAccount };
