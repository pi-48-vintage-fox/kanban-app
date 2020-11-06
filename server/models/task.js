'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../router');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be create"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Category must be create"
        }
      }
    },
    UserId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "UserId must be create"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};