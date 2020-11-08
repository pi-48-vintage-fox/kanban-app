'use strict';
const {hashPassword} = require("../helpers/bcrypt")
const {
  Model
} = require('sequelize');
const bcrypt = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: {
          argv:true,
          msg:"Email required!"
        },
        isEmail: {
          argv: true,
          msg: "Please input with email format!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
            args: true,
            msg: "Password is required!"
          }
      }
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          argv: true,
          msg: "Name is required!"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};