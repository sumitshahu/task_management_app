const List = require('../models/List');
const Board = require('../models/Board');

// Create a List
exports.createList = async (req, res) => {
  const { listName } = req.body;
  const boardId = req.params.boardId; 

  if (!listName || !boardId) {
    return res.status(400).json({ message: 'BoardId and listName are required' });
  }

  try {
    // Check if the board exists
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Create the List associated with the board
    const list = await List.create({ listName, boardId });
    res.status(201).json(list); // Return the created list
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Error creating list' });
  }
};

// Get all Lists for a specific Board
exports.getLists = async (req, res) => {
  const boardId = req.params.boardId;
  
  try {
    const lists = await List.findAll({ where: { boardId } });
    res.status(200).json(lists); // Return the lists
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Error fetching lists' });
  }
};
