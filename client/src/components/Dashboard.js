import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [background, setBackground] = useState('#f0f0f0');
  const [editBoardId, setEditBoardId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editGithubRepo, setEditGithubRepo] = useState('');
  const [editBackground, setEditBackground] = useState('#f0f0f0');

  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/boards`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBoards(res.data); // Assuming backend sends boards -> each board has lists -> each list has tasks
      } catch (err) {
        console.error('Error fetching boards:', err.response?.data);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchBoards();
  }, [navigate]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/boards`,
        { title, githubRepo, background },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBoards([...boards, res.data]);
      setTitle('');
      setGithubRepo('');
      setBackground('#f0f0f0');
    } catch (err) {
      console.error('Error creating board:', err.response?.data);
      alert(err.response?.data?.msg || 'Error creating board');
    }
  };

  const handleEditBoard = async (e, boardId) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/boards/${boardId}`,
        { title: editTitle, githubRepo: editGithubRepo, background: editBackground },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBoards(boards.map((board) => (board._id === boardId ? res.data : board)));
      setEditBoardId(null);
    } catch (err) {
      console.error('Error editing board:', err.response?.data);
      alert(err.response?.data?.msg || 'Error editing board');
    }
  };

  const handleDeleteBoard = async (boardId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this board?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBoards(boards.filter((board) => board._id !== boardId));
    } catch (err) {
      console.error('Error deleting board:', err.response?.data);
      alert(err.response?.data?.msg || 'Error deleting board');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Boards</h1>

      {/* Create Board Form */}
      <form onSubmit={handleCreateBoard} className="mb-6 bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Board Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
            required
          />
          <input
            type="text"
            placeholder="GitHub Repo (optional)"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
          />
          <input
            type="text"
            placeholder="Background (color or image URL)"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 p-2 rounded hover:bg-blue-600">
          Create Board
        </button>
      </form>

      {/* Boards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {boards.map((board) => (
          <div key={board._id} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg">
            {editBoardId === board._id ? (
              // Edit Mode
              <form onSubmit={(e) => handleEditBoard(e, board._id)}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 w-full mb-2"
                  required
                />
                <input
                  type="text"
                  value={editGithubRepo}
                  onChange={(e) => setEditGithubRepo(e.target.value)}
                  className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 w-full mb-2"
                />
                <input
                  type="text"
                  value={editBackground}
                  onChange={(e) => setEditBackground(e.target.value)}
                  className="p-2 rounded bg-gray-700 border border-gray-600 text-gray-100 w-full mb-2"
                />
                <div className="flex space-x-2">
                  <button type="submit" className="bg-green-500 p-2 rounded hover:bg-green-600">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditBoardId(null)}
                    className="bg-gray-500 p-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // View Mode
              <>
                <div
                  className="h-20 mb-2 rounded"
                  style={{ background: board.background }}
                ></div>
                <h2 className="text-2xl font-bold">{board.title}</h2>
                {board.githubRepo && (
                  <p className="text-gray-400 text-sm mt-1">GitHub: {board.githubRepo}</p>
                )}
                <p className="text-gray-400 text-sm">
                  Members: {board.members.map((m) => m.email).join(', ')}
                </p>

                {/* Lists and Tasks */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Lists:</h3>
                  {board.lists.length > 0 ? (
                    board.lists.map((list) => (
                      <div key={list._id} className="mb-2">
                        <div className="font-semibold">{list.title}</div>
                        <ul className="list-disc ml-5 text-sm text-gray-400">
                          {list.tasks.map((task) => (
                            <li key={task._id}>
                              {task.title} ({task.status})
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No lists yet.</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setEditBoardId(board._id);
                      setEditTitle(board.title);
                      setEditGithubRepo(board.githubRepo || '');
                      setEditBackground(board.background || '#f0f0f0');
                    }}
                    className="bg-yellow-500 p-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBoard(board._id)}
                    className="bg-red-500 p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/board/${board._id}`)}
                    className="bg-blue-500 p-2 rounded hover:bg-blue-600"
                  >
                    View Board
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
