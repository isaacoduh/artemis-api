const httpStatus = require("http-status");
const { User, Account, AccountHistory, sequelize } = require("../models");
const { abortIf } = require("../utils/request/ApiResponder");
const sendTo = async (payload) => {
  const transaction = await sequelize.transaction();
  try {
    const { username, currency, amount, sender_id } = payload;
    // get user based on their username
    const user = await User.findOne({ where: { username: username } });
    abortIf(!user, httpStatus.NOT_FOUND, "User with Username not found!");

    const account = await Account.findOne({
      where: { user_id: user.dataValues.id, currency },
      transaction,
    });
    abortIf(!account, httpStatus.NOT_FOUND, "Account does not exist");
    abortIf(
      account.currency !== currency,
      httpStatus.BAD_REQUEST,
      "Currency does not match"
    );

    // start the process
    const sAccount = await Account.findOne({
      where: { user_id: sender_id, currency: currency },
      transaction,
    });

    sAccount.balance -= amount;
    account.balance += amount;

    await sAccount.save({ transaction });
    await account.save({ transaction });

    // create new account history transactions for each user
    const sAccountHistory = await AccountHistory.create(
      {
        account_id: sAccount.id,
        user_id: sender_id,
        amount: parseFloat(amount),
        type: "DEBIT",
      },
      { transaction }
    );

    const accountHistory = await AccountHistory.create(
      {
        account_id: account.id,
        user_id: user.id,
        amount: parseFloat(amount),
        type: "CREDIT",
      },
      { transaction }
    );

    await transaction.commit();

    return true;
  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
};

module.exports = { sendTo };
