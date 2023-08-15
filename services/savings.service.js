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

module.exports = { createSavingsPlan };
