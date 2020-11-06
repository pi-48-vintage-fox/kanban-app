'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserOrganization.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      UserOrganization.belongsTo(models.Organization, {
        foreignKey: 'organization_id'
      });
    }
  };
  UserOrganization.init({
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    organization_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'UserOrganization',
  });
  return UserOrganization;
};