const { Sequelize } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const SecurityQuestion = sequelize.define("SecurityQuestion", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
    },
  });

  return SecurityQuestion;
};
