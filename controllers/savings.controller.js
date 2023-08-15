const catchAsync = require("../utils/request/catchAsync");
const savingsService = require("../services/savings.service");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");

const createSavingsPlan = catchAsync(async (req, res) => {
  const {
    name,
    currency,
    startingAmount,
    frequency,
    savingMethod,
    planLength,
  } = req.body;
  const result = await savingsService.createSavingsPlan({
    name,
    currency,
    startingAmount,
    frequency,
    savingMethod,
    planLength,
    user_id: req.user.id,
  });
  return ApiResponder(res, httpStatus.CREATED, "Success", { ...result });
});

module.exports = { createSavingsPlan };
