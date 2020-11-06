'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    name:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please fill in your name'
        }
      }

    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please fill in your email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Please fill in your password'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password,10)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};