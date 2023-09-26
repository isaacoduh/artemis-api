const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        default: 0,
      },
    },
    { paranoid: true }
  );

  Account.associate = (models) => {
    Account.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Account.hasMany(models.AccountHistory, {
      foreignKey: "account_id",
    });
  };

  return Account;
};
