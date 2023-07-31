const httpStatus = require("http-status");
const authService = require("../services/auth.service");
const catchAsync = require("../utils/request/catchAsync");

const {
  ApiResponder,
  successResponse,
} = require("../utils/request/ApiResponder");
const { generateAuthTokens } = require("../utils/security/token");

const registerUser = catchAsync(async (req, res) => {
  const payload = await authService.createUser(req.body);
  return ApiResponder(res, httpStatus.CREATED, "Success", { ...payload });
});

const login = catchAsync(async (req, res) => {
  const payload = await authService.loginWithEmailAndPassword(req.body);
  const tokens = await generateAuthTokens(payload.userData);
  return ApiResponder(res, httpStatus.CREATED, "Success", {
    ...payload,
    tokens,
  });
});

const getAuthUser = catchAsync(async (req, res) => {
  const user = await authService.getSecureUserById(req.user.id);
  return successResponse(res, { user });
});
module.exports = { registerUser, login, getAuthUser };
