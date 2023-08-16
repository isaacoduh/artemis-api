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

const getAllSavingsPlans = catchAsync(async (req, res) => {
  const result = await savingsService.getAllSavingsPlans(req.user.id);
  return ApiResponder(res, httpStatus.OK, "Success", result);
});

const getSavingsPlanById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await savingsService.getSavingsPlanById({
    id,
    user_id: req.user.id,
  });
  return ApiResponder(res, httpStatus.OK, "Success", result);
});

const fundASavingsPlan = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await savingsService.fundASavingsPlan({
    id,
    user_id: req.user.id,
    amount: req.body.amount,
  });
  return ApiResponder(res, httpStatus.OK, "Success", result);
});

const withdrawFromSavings = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await savingsService.withdrawFromSavings({
    id,
    user_id: req.user.id,
    amount: req.body.amount,
  });
  return ApiResponder(res, httpStatus.OK, "Success", result);
});

module.exports = {
  createSavingsPlan,
  getAllSavingsPlans,
  getSavingsPlanById,
  fundASavingsPlan,
  withdrawFromSavings,
};
