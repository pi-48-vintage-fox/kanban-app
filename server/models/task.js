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
      // define association here
      Task.belongsTo(models.Category)
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category is required'
        },
        notEmpty: {
          msg: 'Category is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Creator of the task is required'
        },
        notEmpty: {
          msg: 'Creator of the task is required'
        }
      }
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Organization is required'
        },
        notEmpty: {
          msg: 'Organization is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};