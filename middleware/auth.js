const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/request/ApiError");
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return ApiError(httpStatus.UNAUTHORIZED);
      }
      req.user = data.sub;
      next();
    });
  } else {
    return ApiError(httpStatus.UNAUTHORIZED);
  }
};

module.exports = { authenticateJWT };
