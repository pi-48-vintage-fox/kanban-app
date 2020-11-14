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
      User.belongsToMany(models.Task, {
        through: models.UserOrganizationTasks,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
      User.belongsToMany(models.Organization, {
        through: models.UserOrganizationTasks,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Format must be an email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        min: {
          args: 4,
          msg: "Password minimum 4 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        if(user.name == "" || !user.name) {
          user.name = user.email
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};