'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    
    static associate(models) {
      Task.belongsTo(models.User, {foreignKey: "UserId"})
      Task.belongsTo(models.Category, {foreignKey: "CategoryId"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty:{
          args: true,
          msg: "Task is required!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required!"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};