'use strict';
const {
  Model
} = require('sequelize');
const Encrypt = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Organization, {
        through: models.UserOrganization,
        foreignKey: 'user_id'
      });
      User.hasMany(models.Task);
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Please use email format'
        }
      },
      unique: {
        msg: 'Email has already registered'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = Encrypt.hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};