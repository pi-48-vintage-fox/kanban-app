'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.belongsToMany(models.User, {
        through: models.UserOrganization,
        foreignKey: 'organization_id'
      });
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Organization name required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};