const { successResponse } = require("../utils/request/ApiResponder");
const catchAsync = require("../utils/request/catchAsync");
const profileService = require("../services/profile.service");

const createSecurityQuestion = catchAsync(async (req, res) => {
  const { question_id, answer } = req.body;
  const result = await profileService.createSecurityQuestion({
    user_id: req.user.id,
    question_id,
    answer,
  });
  return successResponse(res, { result });
});

const bulkSaveSecurityQuestions = catchAsync(async (req, res) => {
  const { payload } = req.body;
  const result = await profileService.bulkSaveSecurityQuestions(
    payload,
    req.user.id
  );
  return successResponse(res, { result });
});

module.exports = { createSecurityQuestion, bulkSaveSecurityQuestions };
