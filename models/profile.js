const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      gender: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { paranoid: true }
  );

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };
  return Profile;
};
