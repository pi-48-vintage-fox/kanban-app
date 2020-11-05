'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Task.belongsTo(models.User, {
                targetKey: 'id',
                foreignKey: 'UserId'
            })
        }
    };
    Task.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please input task title'
                }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please input task category'
                }
            }
        },
        UserId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};