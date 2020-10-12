import React from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';

const Welcome = () => {
  let history = useHistory();
  const handleClick = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list');
  };

  return (
    <div className="welcome">
      <h1>Welcome to your Smart shopping list</h1>
      <button class="button-token" onClick={handleClick}>
        Create a new list{' '}
      </button>
    </div>
  );
};

export default Welcome;
