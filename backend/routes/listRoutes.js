const express = require('express');
const router = express.Router();
const { createList, getLists } = require('../controllers/listController');

// POST - Create a list for a board
router.post('/create/:boardId', createList);

// GET - Fetch all lists for a specific board
router.get('/:boardId', getLists);

module.exports = router;
