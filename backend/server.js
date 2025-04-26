const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes'); 


const { sequelize } = require('./config/db');
const Board = require('./models/Board');
const List = require('./models/List');
const Task = require('./models/Task'); 

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tasks', taskRoutes); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');

   
    Board.hasMany(List, { foreignKey: 'boardId' });
    List.belongsTo(Board, { foreignKey: 'boardId' });

    List.hasMany(Task, { foreignKey: 'listId' });  
    Task.belongsTo(List, { foreignKey: 'listId' }); 


    await sequelize.sync({ alter: true });
    console.log('Database synced!');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
});
