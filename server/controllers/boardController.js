const Board = require('../models/Board');
const jwt = require('jsonwebtoken');

exports.createBoard = async (req, res) => {
    try {
      const userId = req.userId; 
      const { boardName } = req.body; 
  
      
      if (!boardName || !userId) {
        return res.status(400).json({ message: "Board name and user ID are required." });
      }
  
      const newBoard = await Board.create({
        boardName, 
        userId     
      });
  
      res.status(201).json(newBoard);
    } catch (error) {
      console.error('Error in creating board:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  
  exports.getBoards = async (req, res) => {
    try {
      
      const boards = await Board.findAll({
        where: { userId: req.user.userId }  
         
      });
      
  
      if (!boards.length) {
        return res.status(404).json({ message: 'No boards found.' });
      }
  
      return res.status(200).json(boards);
    } catch (error) {
      console.error('Error fetching boards:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
