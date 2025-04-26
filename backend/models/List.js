const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Board = require('./Board'); // Import Board model
const Task = require('./Task'); // Import Task model

const List = sequelize.define('List', {
  listName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

List.hasMany(Task, { foreignKey: 'listId' });
Task.belongsTo(List, { foreignKey: 'listId' });

module.exports = List;
