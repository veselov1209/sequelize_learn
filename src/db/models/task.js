'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: {field: 'userId'}, as: 'owner'
      });
    }
  }
  Task.init({
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};