import React, { useState, useEffect } from 'react';
import getToken from '../lib/tokens';
import history from './history';

const Welcome = () => {
  const [token, setToken] = useState(localStorage.getItem('storedToken') || '');

  const handleClick = () => {
    setToken(getToken());
    console.log(token);
    // history.push('/list')
  };

  useEffect(() => {
    localStorage.setItem('storedToken', token);
  }, [token]);

  return (
    <div>
      <h1>Welcome to your Smart shopping list</h1>
      <button onClick={handleClick}>Create a new list</button>
      <h3>{token}</h3>
    </div>
  );
};

export default Welcome;
