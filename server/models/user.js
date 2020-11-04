'use strict';

const {hashPassword} = require('../helpers/bcrypt');

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
      User.hasMany(models.Task);
    }

    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Format must be email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be 6 character'
        }
      }
    },
    photo: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate : (user) => {
        user.password = hashPassword(user.password),
        user.photo = 'default.png'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};