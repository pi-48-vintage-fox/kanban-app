'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User,{
        foreignKey : "UserId",
        targetKey : "id"
      })
      // define association here
    }
  };
  Task.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { args : true, msg : "Title required"}
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { args : true, msg : "Description required"}
      }
    },
    category: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { args : true, msg : "Category required"}
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};