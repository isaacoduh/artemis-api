const Joi = require("joi");
const createAccount = {
  body: Joi.object().keys({
    currency: Joi.string().required(),
  }),
};

module.exports = { createAccount };
