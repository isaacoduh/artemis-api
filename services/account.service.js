const { BAD_REQUEST } = require("http-status");
const { Account, sequelize } = require("../models");
const ApiError = require("../utils/request/ApiError");
const { abortIf } = require("../utils/request/ApiResponder");
const createAccount = async (payload) => {
  try {
    const { currency, user_id } = payload;
    // check if a user id already exist for that currency and id
    const accountExists = await Account.findOne({
      where: {
        user_id: user_id,
        currency: currency,
      },
    });

    abortIf(
      accountExists,
      BAD_REQUEST,
      "Account with currency already exists!"
    );
    const account = await Account.create({ user_id, currency, balance: 0.0 });
    return { account };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createAccount };
