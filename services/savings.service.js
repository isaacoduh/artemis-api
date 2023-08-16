const { SavingsPlan, Account, sequelize } = require("../models");
const { abortIf } = require("../utils/request/ApiResponder");
const createSavingsPlan = async (payload) => {
  try {
    const {
      name,
      currency,
      startingAmount,
      frequency,
      savingMethod,
      planLength,
      user_id,
    } = payload;
    const savingsPlan = await SavingsPlan.create({
      name,
      currency,
      startingAmount,
      frequency,
      savingMethod,
      planLength,
      user_id,
    });
    return { savingsPlan };
  } catch (error) {
    console.log(error);
  }
};

const getAllSavingsPlans = async (user_id) => {
  try {
    const plans = await SavingsPlan.findAll({ where: { user_id } });
    return plans;
  } catch (error) {
    console.log(error);
  }
};

const getSavingsPlanById = async (payload) => {
  try {
    const { id, user_id } = payload;
    const plan = await SavingsPlan.findOne({
      where: { id: id, user_id: user_id },
    });

    return plan;
  } catch (error) {
    console.log(error);
  }
};

const fundASavingsPlan = async (payload) => {
  try {
    const { id, user_id, amount } = payload;
    const plan = await SavingsPlan.findOne({
      where: { id: id, user_id: user_id },
    });
    plan.balance += amount;
    await plan.save();
    return plan;
  } catch (error) {}
};

const withdrawFromSavings = async (payload) => {
  const transaction = await sequelize.transaction();
  try {
    const { id, user_id, amount } = payload;

    const plan = await SavingsPlan.findOne(
      {
        where: { id: id, user_id: user_id },
      },
      transaction
    );
    // check for the currency of the savings plan
    const account = await Account.findOne(
      {
        where: { user_id: user_id, currency: plan.currency },
      },
      transaction
    );

    abortIf(
      !account,
      500,
      "You need to create an account in the currency you want to withdraw to!"
    );

    // deduct from plan and credit to account
    // const
    plan.balance -= amount;
    account.balance += amount;

    await plan.save({ transaction });
    await account.save({ transaction });

    await transaction.commit();

    return true;
  } catch (error) {
    await transaction.rollback();
    console.log(error);
  }
};

module.exports = {
  createSavingsPlan,
  getAllSavingsPlans,
  getSavingsPlanById,
  fundASavingsPlan,
  withdrawFromSavings,
};
