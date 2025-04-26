import React from 'react';

const Board = () => {
  const lists = [
    { id: 1, title: 'Todo' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Done' }
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      {lists.map(list => (
        <div key={list.id} style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px', width: '250px' }}>
          <h3>{list.title}</h3>
          <div>
            {/* Later, tasks will go here */}
            <p>Sample Task 1</p>
            <p>Sample Task 2</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
