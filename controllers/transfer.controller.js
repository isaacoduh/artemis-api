const catchAsync = require("../utils/request/catchAsync");
const transferService = require("../services/transfer.service");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");

const sendTo = catchAsync(async (req, res) => {
  const { username, currency, amount } = req.body;
  const payload = await transferService.sendTo({
    username,
    currency,
    amount,
    sender_id: req.user.id,
  });

  return ApiResponder(res, httpStatus.CREATED, "Success", payload);
});

module.exports = { sendTo };
