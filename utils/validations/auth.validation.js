const Joi = require("joi");
const { password, pin } = require("./custom.validation");

const registerUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { registerUser, loginUser };
