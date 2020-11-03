'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Email is required'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Password is required'}
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Name is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};