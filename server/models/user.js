'use strict';
const {
  Model
} = require('sequelize');
const { makeHash } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      unique: {
        msg : "Email already registered"
      },
      validate:{
        isEmail:{
          msg : "Wrong email format"
        },
        notEmpty:{
          msg: "Email Cannot be empty"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Password Cannot be empty"
        }
      }
    },
    OrganizationId:{
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate(instance){
        return instance.password = makeHash(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};