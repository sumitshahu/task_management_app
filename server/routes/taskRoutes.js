// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

// Create a Task inside a List
router.post('/:listId', authenticateToken, taskController.createTask);

// Get all Tasks for a List
router.get('/:listId', authenticateToken, taskController.getTasks);
router.put('/move/:taskId', authenticateToken, taskController.moveTask);


module.exports = router;
