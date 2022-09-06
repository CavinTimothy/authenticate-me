'use strict';
const {
  Model
} = require('sequelize');
const { validator } = require('validator');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: {
          args: [3, 256],
          msg: 'Must be valid email'
        },
        isEmail: {
          args: true,
          msg: 'Must be valid email'
        }
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: {
          args: [4, 30],
          msg: 'Username must be 3-30 characters long'
        },
        isNotEmail(val) {
          if (validator.isEmail(val)) {
            throw new Error('Username must not be email');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Required'
        },
        len: [60, 60]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
