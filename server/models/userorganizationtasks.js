'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganizationTasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserOrganizationTasks.belongsTo(models.User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
      UserOrganizationTasks.belongsTo(models.Organization, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
      UserOrganizationTasks.belongsTo(models.Task, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    }
  };
  UserOrganizationTasks.init({
    UserId:  {
      type: DataTypes.INTEGER
    },
    TaskId: {
      type: DataTypes.INTEGER
    },
    OrganizationId:  {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'UserOrganizationTasks',
  });
  return UserOrganizationTasks;
};