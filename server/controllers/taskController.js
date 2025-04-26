const Task = require('../models/Task');
const List = require('../models/List');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const listId = req.params.listId;

  if (!title || !listId) {
    return res.status(400).json({ message: 'Title and List ID are required' });
  }

  try {
    const list = await List.findByPk(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    const task = await Task.create({ title, description, dueDate, priority, status, listId });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {
  const listId = req.params.listId;

  try {
    const tasks = await Task.findAll({ where: { listId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};



exports.moveTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { targetListId } = req.body;
  
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      const targetList = await List.findByPk(targetListId);
      if (!targetList) {
        return res.status(404).json({ message: 'Target list not found' });
      }
  
      task.listId = targetListId;
      await task.save();
  
      res.status(200).json({ message: 'Task moved successfully', task });
    } catch (error) {
      console.error('Error moving task:', error);
      res.status(500).json({ message: 'Error moving task' });
    }
  };