'use strict';
const {
  Model
} = require('sequelize');
const { hashpassword } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {
        foreignKey: "userId",
        sourceKey: "id"
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          message: "Email cannot be empty!"
        },
        isEmail: {
          message: "Must be format email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: {
          message: "Password cannot be empty"
        },
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashpassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};