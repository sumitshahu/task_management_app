import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'; 
import Board from './components/Board';
import BoardPage from './components/BoardPage';
import BoardDetailPage from './components/BoardDetailPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} /> 
        <Route exact path="/board" element={<Board />} />  {/* Board component */}
        <Route exact path="/board/:id" element={<BoardPage />} />  {/* BoardPage component */}
        <Route exact path="/board/:id/details" element={<BoardDetailPage />} />  {/* BoardDetailPage component */}
      </Routes>
    </Router>
  );
}

export default App;
