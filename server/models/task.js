'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
   
    static associate(models) {
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please fill in your task title'
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please specify the task category'
        }
      }
    },
    UserId:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};