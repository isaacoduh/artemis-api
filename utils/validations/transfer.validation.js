const Joi = require("joi");
const sendToRequest = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = { sendToRequest };
