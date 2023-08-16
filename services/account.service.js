const { BAD_REQUEST } = require("http-status");
const { Account, AccountHistory, sequelize } = require("../models");
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

const getAllAccounts = async (id) => {
  try {
    const accounts = await Account.findAll({ where: { user_id: id } });
    return { accounts };
  } catch (error) {}
};

const getAccount = async (payload) => {
  try {
    const account = await Account.findOne({
      where: { id: payload.id, user_id: payload.user_id },
    });
    return account;
  } catch (error) {
    console.log(error);
  }
};

const updateAccountHistory = async (payload) => {
  try {
    const { account_id, amount, type, user_id } = payload;
    const updateAccount = await AccountHistory.create({
      account_id: account_id,
      user_id: user_id,
      amount: parseFloat(amount),
      type: type,
    });
    return updateAccount;
  } catch (error) {
    console.log(error);
  }
};

const getAccountHistory = async (id) => {
  try {
    const accountHistory = await AccountHistory.findAll({ where: { id: id } });
    return { accountHistory };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  getAccount,
  updateAccountHistory,
  getAccountHistory,
};
