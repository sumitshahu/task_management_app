const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  dueDate: DataTypes.DATE,
  priority: DataTypes.STRING,
  status: DataTypes.STRING,
});

module.exports = Task;
