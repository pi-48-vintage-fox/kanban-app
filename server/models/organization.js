'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {

    static associate(models) {
      Organization.hasMany(models.Category)
      Organization.hasMany(models.User)
      Organization.hasMany(models.Task)
    }
  };
  Organization.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};