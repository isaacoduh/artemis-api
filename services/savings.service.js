const { SavingsPlan, sequelize } = require("../models");
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

module.exports = { createSavingsPlan, getAllSavingsPlans, getSavingsPlanById };
