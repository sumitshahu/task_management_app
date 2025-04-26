import React from 'react';

const Signup = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Name" style={{ display: 'block', margin: '1rem 0' }} />
        <input type="email" placeholder="Email" style={{ display: 'block', margin: '1rem 0' }} />
        <input type="password" placeholder="Password" style={{ display: 'block', margin: '1rem 0' }} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
