const {Sequelize} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{paranoid: true});
  return Task;
}
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class tasks extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   tasks.init({
//     name: DataTypes.STRING,
//     description: DataTypes.STRING,
//     done: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'tasks',
//   });
//   return tasks;
// };