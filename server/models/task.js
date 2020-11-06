'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: 'id'
      })
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Can't be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Can't be empty"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        msg: "Can't be emtpy"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        msg: "Can't be empty"
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};