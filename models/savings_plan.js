const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const SavingsPlan = sequelize.define("SavingsPlan", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM("NGN", "USD"),
      defaultValue: "NGN",
    },
    startingAmount: {
      type: DataTypes.FLOAT,
    },
    frequency: {
      type: DataTypes.ENUM("daily", "weekly", "bi-weekly", "monthly"),
      defaultValue: "monthly",
    },
    savingMethod: {
      type: DataTypes.ENUM("manual", "automatic"),
      defaultValue: "manual",
    },
    planLength: {
      type: DataTypes.INTEGER,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  });
  return SavingsPlan;
};
