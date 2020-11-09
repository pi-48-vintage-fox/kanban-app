'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      // define association here
      Task.belongsTo(models.Category) 
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
    tag: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Can't be empty"
        }
      }
    },
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
