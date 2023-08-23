const express = require("express");
const { validateReq } = require("../middleware/validate");
const {
  registerUser,
  loginUser,
} = require("../utils/validations/auth.validation");
const authController = require("../controllers/auth.controller");
const { authenticateJWT } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/register",
  validateReq(registerUser),
  authController.registerUser
);
router.post("/login", validateReq(loginUser), authController.login);
router.get("/me", authenticateJWT, authController.getAuthUser);

module.exports = router;
