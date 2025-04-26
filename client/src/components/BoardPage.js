import React from 'react';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const { id } = useParams();

  // Sample static lists (later you can fetch from API)
  const lists = [
    { id: 1, title: 'Todo' },
    { id: 2, title: 'Doing' },
    { id: 3, title: 'Done' },
  ];

  return (
    <div>
      <h1>Board ID: {id}</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {lists.map(list => (
          <div key={list.id} style={{ border: '1px solid black', padding: '10px', width: '200px' }}>
            <h3>{list.title}</h3>
            {/* Later: tasks inside lists */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
