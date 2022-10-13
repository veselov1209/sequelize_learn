'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
 
    static associate(models) {
      User.hasMany(models.Task,{
        foreignKey: {
          field: 'userId'
        }
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    age: DataTypes.NUMBER,
    passwordHash: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};