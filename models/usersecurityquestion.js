const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const UserSecurityQuestion = sequelize.define("UserSecurityQuestion", {
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: DataTypes.BIGINT,
    userId: DataTypes.BIGINT,
  });
  UserSecurityQuestion.associate = (models) => {
    UserSecurityQuestion.belongsTo(models.User, { foreignKey: "userId" });
    UserSecurityQuestion.belongsTo(models.SecurityQuestion, {
      foreignKey: "questionId",
    });
  };
  return UserSecurityQuestion;
};
