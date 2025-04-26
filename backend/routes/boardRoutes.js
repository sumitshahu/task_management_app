const express = require('express');
const router = express.Router();
const { createBoard, getBoards } = require('../controllers/boardController');
const authenticateToken = require('../middleware/authMiddleware');  // Import the authentication middleware

// Use the authenticateToken middleware to protect the create route
router.post('/create', authenticateToken, createBoard);

// You can also add the getBoards route if you want to fetch the boards
router.get('/', authenticateToken, getBoards);  // Example: Fetch all boards (protected route)

module.exports = router;
