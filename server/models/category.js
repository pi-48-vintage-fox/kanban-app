'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      Category.hasMany(models.Task, {as: 'tasks', foreignKey: 'CategoryId'})
      Category.belongsToMany(models.User, {as: "usersCategory", through: "Tasks"})
    }
  };
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};