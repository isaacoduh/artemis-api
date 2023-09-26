const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const AccountHistory = sequelize.define(
    "AccountHistory",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      account_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.FLOAT },
      type: { type: DataTypes.STRING },
    },
    { paranoid: true }
  );

  AccountHistory.associate = (models) => {
    AccountHistory.belongsTo(models.Account, {
      foreignKey: "account_id",
    });
  };

  return AccountHistory;
};
