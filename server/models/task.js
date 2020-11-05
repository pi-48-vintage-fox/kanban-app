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
      Task.belongsTo(models.Category)
      Task.belongsTo(models.User)
      Task.hasMany(models.TaskTag)
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Title Cannot empty"
        }
      }
    },
    descriptions: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Descriptions Cannot empty"
        }
      }
    },
    OrganizationId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "Organization Cannot empty"
        }
      }
    },
    CategoryId: {
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "Category Cannot empty"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};