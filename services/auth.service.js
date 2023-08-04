const { BAD_REQUEST } = require("http-status");
const { User, Profile, sequelize } = require("../models");
const bcrypt = require("bcryptjs");
const {
  abortIf,
  abort,
  abortUnless,
} = require("../utils/request/ApiResponder");
const httpStatus = require("http-status");
const createUser = async (userPayload) => {
  const payload = { ...userPayload };
  const emailTaken = await User.isEmailTaken(
    userPayload.email.toString().toLowerCase()
  );
  abortIf(emailTaken, BAD_REQUEST, "Email already exists");
  return sequelize.transaction(async (transaction) => {
    payload.password = await bcrypt.hash(payload.password, 8);
    payload.email = userPayload.email.toString().toLowerCase();

    const user = await User.create(payload, { transaction });
    const profile = await Profile.create({ user_id: user.id }, { transaction });
    return { user, profile };
  });
};

const loginWithEmailAndPassword = async (payload) => {
  const { email, password } = payload;
  // trim email
  const trimmedEmail = email.toString().trim().toLowerCase();
  const user = await getSecureUserByEmail(trimmedEmail);
  if (!user || !(await user.isPasswordMatch(password))) {
    abort(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  // last seen
  const userData = user.get({ plain: true });
  return { userData };
};

const getSecureUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const getSecureUserById = async (id) => {
  return User.findOne({ where: { id: id } });
};

module.exports = { createUser, loginWithEmailAndPassword, getSecureUserById };
