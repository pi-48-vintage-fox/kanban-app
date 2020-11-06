'use strict';
const { Model } = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Task, {
                sourceKey: 'id',
                foreignKey: 'UserId'
            })
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please input name'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please input email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please input password'
                }
            }
        },
        organization: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(user) {
                user.password = hashPass(user.password)
                user.organization = 'Hacktiv8'
            }
        }
    });
    return User;
};