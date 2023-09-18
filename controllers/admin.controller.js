const catchAsync = require("../utils/request/catchAsync");
const adminService = require("../services/admin.service");
const { ApiResponder } = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");

const createSecurityQuestion = catchAsync(async (req, res) => {
  const payload = await adminService.createSecurityQuestion(req.body);
  return ApiResponder(res, httpStatus.CREATED, "Success", { ...payload });
});

const bulkCreateSecurityQuestions = catchAsync(async (req, res) => {
  const { questions } = req.body;
  const r = await adminService.bulkCreateSecurityQuestions(questions);
  return ApiResponder(res, httpStatus.CREATED, "Success");
});

const getAllSecurityQuestions = catchAsync(async (req, res) => {
  const payload = await adminService.getAllSecurityQuestions();
  return ApiResponder(res, httpStatus.OK, "Success", payload);
});

const getAllUsers = catchAsync(async (req, res) => {
  const payload = await adminService.getAllUsers();
  return ApiResponder(res, httpStatus.OK, "Success", payload);
});

module.exports = {
  createSecurityQuestion,
  getAllSecurityQuestions,
  bulkCreateSecurityQuestions,
  getAllUsers,
};
