'use strict';
const { hashPassword } = require("../helper/bcrypt")

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
        notEmpty: {
          msg: "Email must be Input"
        },
        isEmail: {
          args: true,
          msg: "Format input must be Email ex. xxx@mail.com"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must be Input"
        },
        len: {
          args: [6],
          msg: "Password must be length of 6 character"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};