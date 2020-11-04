'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcrypt')
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
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate(user){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};