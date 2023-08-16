const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define("Wallet", {
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.ENUM("NGN", "GHS", "USD", "GBP"),
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Wallet;
};
