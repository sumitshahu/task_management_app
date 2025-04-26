import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BoardDetailPage = () => {
  const { id } = useParams(); 
  const [board, setBoard] = useState(null);

  useEffect(() => {
    
    const mockBoard = { id, name: `Board ${id}`, lists: [{ name: 'List 1' }, { name: 'List 2' }] };
    setBoard(mockBoard);
  }, [id]);

  return (
    <div>
      {board ? (
        <div>
          <h1>{board.name}</h1>
          <h2>Lists</h2>
          <ul>
            {board.lists.map((list, index) => (
              <li key={index}>{list.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BoardDetailPage;
