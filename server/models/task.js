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
      Task.belongsTo(models.User,{
        foreignKey: 'UserId'
      })
    }
  };
  Task.init({
    title:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title is required'
        }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.category = 'backlog'
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};